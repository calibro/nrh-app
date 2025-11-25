let groupDimension = $state('none')
let pSortDesc = $state(true);

export const getInterface = () => {

    return {
        get groupDimension() {
            return groupDimension;
        },
        set groupDimension(value) {
            groupDimension = value;
        },
        get pSortDesc() {
            return pSortDesc;
        },
        set pSortDesc(value) {
            pSortDesc = value;
        }
    };
};