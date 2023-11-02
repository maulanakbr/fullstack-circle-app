import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrate1698158446241 implements MigrationInterface {
  name = 'NewMigrate1698158446241';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`user_image\` varchar(255) NULL, \`description\` varchar(255) NULL, UNIQUE INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` (\`email\`, \`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`threads\` (\`id\` varchar(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`likes\` (\`threadsId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_5dd48182c6704e9946fd08a8ad\` (\`threadsId\`), INDEX \`IDX_d5312be6de5784293ac2908978\` (\`usersId\`), PRIMARY KEY (\`threadsId\`, \`usersId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP COLUMN \`posted_at\``,
    );
    await queryRunner.query(`ALTER TABLE \`threads\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`threadId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_256dd2e4946d6768c5583caa072\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_380adfed7b8d4a9bcc1e42d44c0\` FOREIGN KEY (\`threadId\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_5dd48182c6704e9946fd08a8ad9\` FOREIGN KEY (\`threadsId\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_d5312be6de5784293ac29089784\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_d5312be6de5784293ac29089784\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_5dd48182c6704e9946fd08a8ad9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_380adfed7b8d4a9bcc1e42d44c0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_256dd2e4946d6768c5583caa072\``,
    );
    await queryRunner.query(`ALTER TABLE \`threads\` DROP COLUMN \`threadId\``);
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP COLUMN \`updated_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP COLUMN \`created_at\``,
    );
    await queryRunner.query(`ALTER TABLE \`threads\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`threads\` DROP COLUMN \`posted_at\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`threads\` ADD \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d5312be6de5784293ac2908978\` ON \`likes\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5dd48182c6704e9946fd08a8ad\` ON \`likes\``,
    );
    await queryRunner.query(`DROP TABLE \`likes\``);
    await queryRunner.query(`DROP TABLE \`threads\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
