import { EmpresaService } from '../empresa/empresa.service';

export async function seedEmpresa(empresaService: EmpresaService) {
  const nombre = 'Empresa Default';
  const yaExiste = await empresaService.findByName(nombre);

  if (!yaExiste) {
    await empresaService.create({
      nombre: 'Empresa Default',
      ruc: '12345678901',
      email: 'empresa@default.com',
      telefono: '999999999',
      direccion: 'Av. Siempre Viva 123',
      logo_url: 'uploads/logos/Logo-Nike.jpg', // Ruta de la imagen por defecto
      dominio : 'empresa-default.test',
    });

    

    console.log('✅ Empresa creada');
  } else {
    console.log('ℹ️ Empresa ya existe');
  }
}
