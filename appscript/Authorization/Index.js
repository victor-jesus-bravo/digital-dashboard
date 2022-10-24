const authorizedUsers = [
    "adrian_alberto_faz_jr@whirlpool.com",
    "dorlee_garcia@whirlpool.com",
    "victor_jesus_bravo@whirlpool.com",
    "kattia_puga@whirlpool.com",
    "octavio_r_giron@whirlpool.com",
    "nicolas_carvajal_mapower@whirlpool.com",
    "karen_marin@whirlpool.com",
    "marcelo_lozada@whirlpool.com"
];

function checkUserAuthorization(user) {
    if (!isAuthorizedUser(user)) {
        return user;
    }
}

function isAdminDashboard(parameters) {
    if (parameters.isAdminDashboard) {
        return true;
    }

    return false;
}

function isAuthorizedUser(user) {
    if (authorizedUsers.includes(user)) {
        return true;
    }

    return false;
}