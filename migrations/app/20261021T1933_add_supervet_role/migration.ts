#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1ac118d08dce7370a019596e8a0763d53d9518c7bd83d4302b52ea2fdb296670/contract';
import endContract from '../../snapshots/1ac118d08dce7370a019596e8a0763d53d9518c7bd83d4302b52ea2fdb296670/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/4e81cdc979f62ff11e1e41207e0ec258096b368968e40a6a7a1444fe6bbaa536/contract';
import startContract from '../../snapshots/4e81cdc979f62ff11e1e41207e0ec258096b368968e40a6a7a1444fe6bbaa536/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'Clinic', column: 'idCardUrl' }),
      this.dropColumn({ schema: 'public', table: 'Clinic', column: 'licenseUrl' }),
      this.dropCheckConstraint({
        schema: 'public',
        table: 'User',
        constraint: 'User_role_check_bd992476',
      }),
      this.addColumn({
        schema: 'public',
        table: 'Vet',
        column: col('userId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Clinic',
        column: col('NIN', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Clinic-NIN', {
        check: () => placeholder('backfill-Clinic-NIN:check'),
        run: () => placeholder('backfill-Clinic-NIN:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Clinic', column: 'NIN' }),
      this.addColumn({
        schema: 'public',
        table: 'Clinic',
        column: col('RC', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Clinic-RC', {
        check: () => placeholder('backfill-Clinic-RC:check'),
        run: () => placeholder('backfill-Clinic-RC:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Clinic', column: 'RC' }),
      this.addColumn({
        schema: 'public',
        table: 'Vet',
        column: col('NIN', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Vet-NIN', {
        check: () => placeholder('backfill-Vet-NIN:check'),
        run: () => placeholder('backfill-Vet-NIN:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Vet', column: 'NIN' }),
      this.addColumn({
        schema: 'public',
        table: 'Vet',
        column: col('licenseUrl', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-Vet-licenseUrl', {
        check: () => placeholder('backfill-Vet-licenseUrl:check'),
        run: () => placeholder('backfill-Vet-licenseUrl:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Vet', column: 'licenseUrl' }),
      this.dataTransform(endContract, 'handle-nulls-Vet-phone', {
        check: () => placeholder('handle-nulls-Vet-phone:check'),
        run: () => placeholder('handle-nulls-Vet-phone:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'Vet', column: 'phone' }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'User',
        constraint: 'User_role_check_9bd23b2b',
        expression: `"role" IN ('VET', 'STAFF', 'OWNER', 'ADMIN', 'SUPERVET')`,
      }),
      this.addUnique({
        schema: 'public',
        table: 'Vet',
        constraint: 'Vet_userId_key',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Vet',
        foreignKey: {
          name: 'Vet_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
