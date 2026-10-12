#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4e81cdc979f62ff11e1e41207e0ec258096b368968e40a6a7a1444fe6bbaa536/contract';
import endContract from '../../snapshots/4e81cdc979f62ff11e1e41207e0ec258096b368968e40a6a7a1444fe6bbaa536/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Appointment',
        columns: [
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('patientID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('reason', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('vetID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Appointment_status_check_6c2f291b',
            `"status" IN ('PENDING', 'CONFIRMED', 'INPROGRESS', 'COMPLETED', 'CANCELLED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Attachment',
        columns: [
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('medRecID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('type', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('uploadedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('url', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Clinic',
        columns: [
          col('clinicname', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('idCardUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('licenseUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('nid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Clinic_status_check_56005a61',
            `"status" IN ('PENDING', 'APPROVED', 'REJECTED')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'InvLog',
        columns: [
          col('action', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('changedAmount', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('method', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('prdctID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('timestamp', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('vetID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('InvLog_action_check_6c2650b2', `"action" IN ('ADD', 'USE')`),
          checkExpression('InvLog_method_check_83e8431e', `"method" IN ('MANUAL', 'SCAN')`),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Location',
        columns: [
          col('clinicId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('latitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('longitude', 'float8', { codecRef: { codecId: 'pg/float8@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'MedicalRecord',
        columns: [
          col('appointmentID', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('diagnosis', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('instructions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('nextVisitDate', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('treatment', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Owner',
        columns: [
          col('address', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isGuest', 'bool', { notNull: true, codecRef: { codecId: 'pg/bool@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('nid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Patient',
        columns: [
          col('PetName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('age', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('breed', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('ownerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('species', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Product',
        columns: [
          col('cuid', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expiryDate', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isActive', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('minimumStock', 'int4', {
            notNull: true,
            default: lit(5),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('qr', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('username', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'User_role_check_bd992476',
            `"role" IN ('VET', 'STAFF', 'OWNER', 'ADMIN', 'CLINIC')`,
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Vet',
        columns: [
          col('clinicId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('fullName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'WorkingSchedule',
        columns: [
          col('EndTime', 'time', { notNull: true, codecRef: { codecId: 'pg/time-temporal@1' } }),
          col('StartTime', 'time', { notNull: true, codecRef: { codecId: 'pg/time-temporal@1' } }),
          col('WorkingDays', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('clinicid', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'WorkingSchedule_WorkingDays_check_a8bb9e2d',
            `"WorkingDays" IN ('MONDAY', 'SUNDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY')`,
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Appointment',
        constraint: 'Appointment_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Attachment',
        constraint: 'Attachment_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Clinic',
        constraint: 'Clinic_nid_key',
        columns: ['nid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Clinic',
        constraint: 'Clinic_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'InvLog',
        constraint: 'InvLog_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Location',
        constraint: 'Location_clinicId_key',
        columns: ['clinicId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'MedicalRecord',
        constraint: 'MedicalRecord_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Owner',
        constraint: 'Owner_userId_key',
        columns: ['userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Owner',
        constraint: 'Owner_nid_key',
        columns: ['nid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Patient',
        constraint: 'Patient_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Product',
        constraint: 'Product_cuid_key',
        columns: ['cuid'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_username_key',
        columns: ['username'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_phone_key',
        columns: ['phone'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Appointment',
        index: 'Appointment_patientID_idx_28a6562d',
        columns: ['patientID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Appointment',
        index: 'Appointment_vetID_idx_a0155ff5',
        columns: ['vetID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attachment',
        index: 'Attachment_medRecID_idx_92ccce20',
        columns: ['medRecID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'InvLog',
        index: 'InvLog_prdctID_idx_6037af7d',
        columns: ['prdctID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'InvLog',
        index: 'InvLog_vetID_idx_a0155ff5',
        columns: ['vetID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'MedicalRecord',
        index: 'MedicalRecord_appointmentID_idx_425e9f33',
        columns: ['appointmentID'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Patient',
        index: 'Patient_ownerId_idx_e2d0c1ef',
        columns: ['ownerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Vet',
        index: 'Vet_clinicId_idx_8f933800',
        columns: ['clinicId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'WorkingSchedule',
        index: 'WorkingSchedule_clinicid_idx_c827ead1',
        columns: ['clinicid'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Appointment',
        foreignKey: {
          name: 'Appointment_patientID_fkey',
          columns: ['patientID'],
          references: { schema: 'public', table: 'Patient', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Appointment',
        foreignKey: {
          name: 'Appointment_vetID_fkey',
          columns: ['vetID'],
          references: { schema: 'public', table: 'Vet', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Attachment',
        foreignKey: {
          name: 'Attachment_medRecID_fkey',
          columns: ['medRecID'],
          references: { schema: 'public', table: 'MedicalRecord', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Clinic',
        foreignKey: {
          name: 'Clinic_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'InvLog',
        foreignKey: {
          name: 'InvLog_prdctID_fkey',
          columns: ['prdctID'],
          references: { schema: 'public', table: 'Product', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'InvLog',
        foreignKey: {
          name: 'InvLog_vetID_fkey',
          columns: ['vetID'],
          references: { schema: 'public', table: 'Vet', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Location',
        foreignKey: {
          name: 'Location_clinicId_fkey',
          columns: ['clinicId'],
          references: { schema: 'public', table: 'Clinic', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'MedicalRecord',
        foreignKey: {
          name: 'MedicalRecord_appointmentID_fkey',
          columns: ['appointmentID'],
          references: { schema: 'public', table: 'Appointment', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Owner',
        foreignKey: {
          name: 'Owner_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Patient',
        foreignKey: {
          name: 'Patient_ownerId_fkey',
          columns: ['ownerId'],
          references: { schema: 'public', table: 'Owner', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Vet',
        foreignKey: {
          name: 'Vet_clinicId_fkey',
          columns: ['clinicId'],
          references: { schema: 'public', table: 'Clinic', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'WorkingSchedule',
        foreignKey: {
          name: 'WorkingSchedule_clinicid_fkey',
          columns: ['clinicid'],
          references: { schema: 'public', table: 'Clinic', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
