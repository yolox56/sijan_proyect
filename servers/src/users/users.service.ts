
import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';  
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  /**
   * Inyectamos el Repositorio. Es la herramienta que nos permite
   * comunicarnos con PostgreSQL (DataGrip).
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /** * REGISTRO (SIGN UP): 
   * Crea un usuario. Usamos 'async' porque el guardado en DB no es instantáneo.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validamos si el correo ya existe antes de intentar guardar
    const existe = await this.usersRepository.findOneBy({ correo: createUserDto.correo });
    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }
    const nuevoUsuario = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(nuevoUsuario);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ usuario: User; token: string }> {
    const usuario = await this.usersRepository.findOneBy({ correo: loginUserDto.correo });

    if (!usuario || usuario.password !== loginUserDto.password) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // Token simple para entorno de practica.
    const token = `token-${usuario.id}`;
    return { usuario, token };
  }

  //* BUSCAR POR CORREO:
  async findOneByCorreo(correo: string): Promise<User | null> {
  return await this.usersRepository.findOneBy({ correo });}

  /** * DASHBOARD: 
   * Trae todos los usuarios para que el Frontend los filtre por edad.
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  /** * LOGIN / VALIDACIÓN: 
   * Busca un usuario por correo para validar su existencia.
   */
  async findBycorreo(correo: string): Promise<User> {
    const usuario = await this.usersRepository.findOneBy({ correo });
    if (!usuario) {
      throw new NotFoundException(`El usuario con correo ${correo} no existe`);
    }
    return usuario;
  }

  /** * BUSCAR POR ID: 
   * Útil si quieres ver el perfil de un solo usuario.
   */
  async findOne(id: string): Promise<User> {
    const User = await this.usersRepository.findOneBy({ id });
    if (!User) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return User;
  }

  /** * ACTUALIZAR: 
   * Usa Object.assign para mezclar los datos viejos con los nuevos.
   */
  async update(id: string, updateUsuarioDto: UpdateUserDto): Promise<User> {
    const usuario = await this.findOne(id); // Reutilizamos findOne para validar existencia
    Object.assign(usuario, updateUsuarioDto);
    return await this.usersRepository.save(usuario);
  }

  /** * ELIMINAR: 
   * Borra al usuario físicamente de la base de datos.
   */
  async remove(id: string): Promise<{ mensaje: string }> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { mensaje: `Usuario con id ${id} eliminado correctamente` };
  }
}
