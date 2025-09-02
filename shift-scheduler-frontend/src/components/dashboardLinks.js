const dashboardLinks = {
    admin: [
        {name: "Dashboard", path: "/"},
        {name: "Manage Employees", path: "manage-employee"},
        {name: "Shifts", path: "shifts"},
        {name: "Staff Schedule", path: "staff-schedule"},
        {name: "Credentialing", path: "credentialing"},
        {name: "Reports", path: "reports"},
        {name: "Messages", path: "messages"},
        {name: "Notifications", path: "notifications"},
        {name: "Settings", path: "settings"},
        ],

        client: [
            {name: "Dashboard", path: "/"},
            {name: "Shifts", path: "shifts"},
            {name: "Staff Schedule", path: "staff-schedule"},
            {name: "Reports", path: "reports"},
            {name: "Messages", path: "messages"},
            {name: "Notifications", path: "notifications"},
            {name: "Settings", path: "settings"},
        ],

        employee: [
            {name: "Dashboard", path: "/"},
            {name: "My Profile", path: "profile"},
            {name: "My Credentials", path: "credentials"},
            {name: "Scheduling", path: "scheduling"},
            {name: "Shift Request", path: "shift-request"},
            {name: "Messages", path: "messages"},
            {name: "Settings", path: "settings"},
        ]
}

export default dashboardLinks;