import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AutenticacionCredencialesDto } from './dto/auten-credenciales.dto';
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Rol } from '../roles/entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AutenticacionIniciarSesionDto } from './dto/auten-iniciar-sesion.dto';


@Injectable()
export class AutenticacionService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    private jwtService: JwtService,

    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>,

    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
  ) { }

  async crearUsuario(autenCredencialesDto: AutenticacionCredencialesDto) {
    const { usuario, password, nombre, cedula, email, empresa_id, rol_id } = autenCredencialesDto;

    // Verificar si el usuario ya existe
    const usuarioExistente = await this.usuarioRepo.findOne({
      where: [{ usuario }, { email }], // Verifica tanto el usuario como el email
    });

    if (usuarioExistente) {
      throw new ConflictException('El usuario o el correo electrónico ya están registrados');
    }

    const empresa = await this.empresaRepo.findOne({ where: { id: empresa_id } });
    if (!empresa) {
      throw new ConflictException('La empresa especificada no existe');
    }

    // Buscar el rol por ID
    const rol = await this.rolRepo.findOne({ where: { id: rol_id } });
    if (!rol) {
      throw new ConflictException('El rol especificado no existe');
    }

    // Generar hash de la contraseña
    const sal = await bcrypt.genSalt();
    const passwordHasheada = await bcrypt.hash(password, sal);

    // Crear el usuario con todos los campos
    const user = this.usuarioRepo.create({
      usuario,
      email,
      password: passwordHasheada,
      nombre,
      cedula,
      empresa,
      rol,
    });

    try {
      await this.usuarioRepo.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('El usuario o el correo electrónico ya están registrados');
      }
      throw new InternalServerErrorException('Error inesperado al crear usuario');
    }
  }

  async iniciarSesion(autenIniciarSesionDto: AutenticacionIniciarSesionDto) {
    const { usuario, password, empresa_id } = autenIniciarSesionDto;
  
    const empresa = await this.empresaRepo.findOne({ where: { id: empresa_id } });

    
    if (!empresa) {
      throw new UnauthorizedException('Empresa no encontrada');
    }

    const user = await this.usuarioRepo.findOne({
      where: { 
        usuario,
        empresa: { id: empresa_id }
      },
      relations: ['empresa','rol', 'rol.rolPermisos', 'rol.rolPermisos.permiso'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado para esta empresa');
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: user.id, empresa_id };
    const accesoToken = await this.jwtService.signAsync(payload);

    return {
      token: accesoToken,
      usuario: {
        id: user.id,
        usuario: user.usuario,
        nombre: user.nombre,
        email: user.email,
        empresa_id: user.empresa.id,
        empresa_nombre: user.empresa.nombre,
        rol_nombre: user.rol.nombre,
        rol_permisos: user.rol.rolPermisos.map(rolPermiso => ({
          id: rolPermiso.id,
          permiso_id: rolPermiso.permiso.id,
          permiso_nombre: rolPermiso.permiso.nombre,
        })),
      },
    };
  }
}

