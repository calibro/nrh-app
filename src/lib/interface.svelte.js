let groupDimension = $state('none')
let pSortDesc = $state(true);
let menuMobileOpen = $state(false);
let selectedSource = $state();

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
        },
        get menuMobileOpen() {
            return menuMobileOpen;
        },
        set menuMobileOpen(value) {
            menuMobileOpen = value;
        },
        get selectedSource() {
            return selectedSource;
        },
        set selectedSource(value) {
            selectedSource = value;
        }
    };
};