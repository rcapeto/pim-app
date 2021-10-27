import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class users1635343737784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'text',
                    isPrimary: true,
                    isGenerated: true,
                    unsigned: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'password',
                    type: 'text',
                },
                {
                    name: 'email',
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'text',
                },
                {
                    name: 'cellphone',
                    type: 'text',
                },
                {
                    name: 'name',
                    type: 'text',
                },
                {
                    name: 'birth_date',
                    type: 'text',
                },
                {
                    name: 'cpf',
                    type: 'text',
                },
                {
                    name: 'credit_card',
                    type: 'text',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
