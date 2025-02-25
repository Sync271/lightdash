import { subject } from '@casl/ability';
import { Organization } from '../types/organization';
import { defineAbilityForOrganizationMember } from './organizationMemberAbility';
import {
    ORGANIZATION_ADMIN,
    ORGANIZATION_EDITOR,
    ORGANIZATION_VIEWER,
} from './organizationMemberAbility.mock';

describe('Organization member permissions', () => {
    let ability = defineAbilityForOrganizationMember(ORGANIZATION_VIEWER);
    describe('when user is an organization admin', () => {
        beforeEach(() => {
            ability = defineAbilityForOrganizationMember(ORGANIZATION_ADMIN);
        });
        it('can manage organizations', () => {
            expect(ability.can('manage', 'Organization')).toEqual(true);
        });
        it('cannot manage another organization', () => {
            const org: Organization = { organizationUuid: '789' };
            expect(ability.can('manage', subject('Organization', org))).toEqual(
                false,
            );
        });
        it('can manage their own organization', () => {
            const org: Organization = { organizationUuid: '456' };
            expect(ability.can('manage', subject('Organization', org))).toEqual(
                true,
            );
        });
        it('can manage member profiles', () => {
            expect(ability.can('manage', 'OrganizationMemberProfile')).toEqual(
                true,
            );
        });
        it('cannot manage other members from another organization', () => {
            expect(
                ability.can(
                    'manage',
                    subject('OrganizationMemberProfile', {
                        organizationUuid: ORGANIZATION_ADMIN.organizationUuid,
                    }),
                ),
            ).toEqual(true);
            expect(
                ability.can(
                    'manage',
                    subject('OrganizationMemberProfile', {
                        organizationUuid: 'notmine',
                    }),
                ),
            ).toEqual(false);
        });
    });

    describe('when user is an editor', () => {
        beforeEach(() => {
            ability = defineAbilityForOrganizationMember(ORGANIZATION_EDITOR);
        });
        it('cannot manage organizations', () => {
            expect(ability.can('manage', 'Organization')).toEqual(false);
        });
        it('can view dashboards', () => {
            expect(ability.can('view', 'Dashboard')).toEqual(true);
        });
        it('cannot view member profiles', () => {
            expect(ability.can('view', 'OrganizationMemberProfile')).toEqual(
                false,
            );
        });
        it('can create invite links', () => {
            expect(ability.can('create', 'InviteLink')).toEqual(true);
        });
    });

    describe('when user is a viewer', () => {
        beforeEach(() => {
            ability = defineAbilityForOrganizationMember(ORGANIZATION_VIEWER);
        });
        it('cannot create any resource', () => {
            expect(ability.can('create', 'Dashboard')).toEqual(false);
            expect(ability.can('create', 'SavedChart')).toEqual(false);
            expect(ability.can('create', 'Project')).toEqual(false);
            expect(ability.can('create', 'Organization')).toEqual(false);
            expect(ability.can('create', 'InviteLink')).toEqual(false);
        });
        it('cannot update any resource', () => {
            expect(ability.can('update', 'Dashboard')).toEqual(false);
            expect(ability.can('update', 'SavedChart')).toEqual(false);
            expect(ability.can('update', 'Project')).toEqual(false);
            expect(ability.can('update', 'Organization')).toEqual(false);
            expect(ability.can('update', 'InviteLink')).toEqual(false);
        });
        it('cannot delete any resource', () => {
            expect(ability.can('delete', 'Dashboard')).toEqual(false);
            expect(ability.can('delete', 'SavedChart')).toEqual(false);
            expect(ability.can('delete', 'Project')).toEqual(false);
            expect(ability.can('delete', 'Organization')).toEqual(false);
            expect(ability.can('delete', 'InviteLink')).toEqual(false);
        });
    });
});
