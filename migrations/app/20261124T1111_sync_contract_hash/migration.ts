#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/14e7b425bfe41f8f7960bda5f812ce2fef4f43687f70874b0641a3132a04b1a9/contract';
import endContract from '../../snapshots/14e7b425bfe41f8f7960bda5f812ce2fef4f43687f70874b0641a3132a04b1a9/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/1ac118d08dce7370a019596e8a0763d53d9518c7bd83d4302b52ea2fdb296670/contract';
import startContract from '../../snapshots/1ac118d08dce7370a019596e8a0763d53d9518c7bd83d4302b52ea2fdb296670/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
