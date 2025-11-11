let groupDimension = $state('country')

export const getInterface = () => {

    return {
        get groupDimension() {
            return groupDimension;
        },
        set groupDimension(value) {
            groupDimension = value;
        }
    };
};