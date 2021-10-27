import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class reservations1635343687793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'reservations',
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
                    name: 'room_id',
                    type: 'varchar',
                },
                {
                    name: 'enter_date',
                    type: 'text',
                },
                {
                    name: 'exit_date',
                    type: 'text',
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservations');
    }

}
