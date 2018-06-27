import ProfileStore from '../../js/stores/ProfileStore';

describe ('Profile Store test functions', () => {
    // it ('', () => {

    // });
    let data, values;

    it ('initializes variables correctly', () => {
        values = {
            user : {},
            secLvl : 1,
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

    it ('does not fetch profile with false id', () => {
        ProfileStore.getProfile('123gotoken!');
        expect(ProfileStore.profileFound).toEqual(false);
    });
});