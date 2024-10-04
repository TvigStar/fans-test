import {
  Column,
  DefaultScope,
  Model,
  Table,
  Scopes,
} from 'sequelize-typescript';

@DefaultScope(() => ({
  attributes: { exclude: ['password'] },
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password'],
    },
  },
}))
@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @Column({ allowNull: false, unique: true })
  username: string;

  @Column
  password: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: true })
  phone: string;
}
