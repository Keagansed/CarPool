import ProfileStore from '../../js/stores/ProfileStore';

describe ('Profile Store test functions', () => {
    let data, values;

    it ('initializes variables correctly', () => {
        values = {
            user : {},
            secLvl : 0,
            profileFound : false,
            token : ''
        };

        data = {
            user : ProfileStore.user,
            secLvl : ProfileStore.secLvl,
            profileFound : ProfileStore.profileFound,
            token : ProfileStore.token
        }

        expect(data).toEqual(values);
    });

    it ('toggle to vouch tab', () => {
        values = {
            vouchTab : true,
            trustTab : false
        };
        
        ProfileStore.toggleToVouch();

        data = {
            vouchTab : ProfileStore.vouchTab,
            trustTab : ProfileStore.trustTab
        };

        expect(data).toEqual(values);
    });

    it ('toggle to trust tab', () => {
        values = {
            vouchTab : false,
            trustTab : true
        };

        ProfileStore.toggleToTrust();

        data = {
            vouchTab : ProfileStore.vouchTab,
            trustTab : ProfileStore.trustTab
        };

        expect(data).toEqual(values);
    });

    it ('sets edit variables', () => {
        ProfileStore.user = {
            firstName : 'testy',
            lastName : 'McTestFace',
            email : 'tester@test.com',
            id : '9311251585081',
            profilePic : ''
        }

        ProfileStore.setEdit();

        values = {
            eFName : 'testy',
            eLName : 'McTestFace',
            eEmail : 'tester@test.com',
            eID : '9311251585081'
        }

        data = {
            eFName : ProfileStore.eFName,
            eLName : ProfileStore.eLName,
            eEmail : ProfileStore.eEmail,
            eID : ProfileStore.eID
        }

        expect(data).toEqual(values);
    });

    it ('does not fetch profile with false id', () => {
        ProfileStore.getProfile('123gotoken!');
        expect(ProfileStore.profileFound).toEqual(false);
    });
});