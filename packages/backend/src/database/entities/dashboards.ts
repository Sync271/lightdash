import { DashboardFilters, DashboardTileTypes } from 'common';
import { Knex } from 'knex';

export const DashboardsTableName = 'dashboards';
export const DashboardVersionsTableName = 'dashboard_versions';
export const DashboardViewsTableName = 'dashboard_views';
export const DashboardTilesTableName = 'dashboard_tiles';
export const DashboardTileTypesTableName = 'dashboard_tile_types';
export const DashboardTileChartTableName = 'dashboard_tile_charts';
export const DashboardTileMarkdownsTableName = 'dashboard_tile_markdowns';
export const DashboardTileLoomsTableName = 'dashboard_tile_looms';

type DbDashboard = {
    dashboard_id: number;
    dashboard_uuid: string;
    name: string;
    description?: string;
    space_id: number;
    created_at: Date;
};

type DbDashboardVersion = {
    dashboard_version_id: number;
    dashboard_id: number;
    created_at: Date;
};

type DbDashboardView = {
    dashboard_view_uuid: string;
    dashboard_version_id: number;
    created_at: Date;
    name: string;
    filters: DashboardFilters;
};

type DbCreateDashboardTile = {
    dashboard_tile_uuid?: string;
    dashboard_version_id: number;
    type: DashboardTileTypes;
    x_offset: number;
    y_offset: number;
    height: number;
    width: number;
};

type DbDashboardTile = Required<DbCreateDashboardTile>;

type DbDashboardTileChart = {
    dashboard_version_id: number;
    dashboard_tile_uuid: string;
    saved_chart_id: number;
};

export type DashboardTable = Knex.CompositeTableType<
    DbDashboard,
    Pick<DbDashboard, 'name' | 'description' | 'space_id'>,
    Pick<DbDashboard, 'name' | 'description'>
>;

export type DashboardVersionTable = Knex.CompositeTableType<
    DbDashboardVersion,
    Pick<DbDashboardVersion, 'dashboard_id'>
>;

export type DashboardViewTable = Knex.CompositeTableType<
    DbDashboardView,
    Pick<DbDashboardView, 'dashboard_version_id' | 'name' | 'filters'>
>;

export type DashboardTileTable = Knex.CompositeTableType<
    DbDashboardTile,
    DbCreateDashboardTile
>;
export type DashboardTileChartTable =
    Knex.CompositeTableType<DbDashboardTileChart>;

type DbDashboardTileLooms = {
    dashboard_version_id: number;
    dashboard_tile_uuid: string;
    title: string;
    url: string;
};

export type DashboardTileLoomsTable =
    Knex.CompositeTableType<DbDashboardTileLooms>;

type DbDashboardTileMarkdowns = {
    dashboard_version_id: number;
    dashboard_tile_uuid: string;
    title: string;
    content: string;
};

export type DashboardTileMarkdownsTable =
    Knex.CompositeTableType<DbDashboardTileMarkdowns>;
