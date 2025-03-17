import { Injectable } from '@angular/core';
import { UserEntity } from '../../core/domain/model/chat/user-entity';
import { UserEntityDto } from '../dto/user-DTO';
@Injectable({
  providedIn: 'root',
})
export class UserMapper {
  toDomain(dto: UserEntityDto): UserEntity {
    return new UserEntity(
      dto.id,
      dto.username,
      dto.email,
      dto.avatar,
      dto.role,
      dto.lastActive,
      dto.isActive,
      dto.createdAt,
    );
  }

  toDTO(domain: UserEntity): UserEntityDto {
    return {
      id: domain.id,
      username: domain.username,
      email: domain.email,
      avatar: domain.avatar,
      role: domain.role,
      lastActive: domain.lastActive,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
    };
  }
}
