const { User } = require('../models/index');
const bcrypt = require('bcrypt');

async function createAdmin() {
    const adminData = {
        email: 'admin@admin.com',
        password: 'AdminPass',
        firstName: 'Admin',
        lastName: 'Admin',
        isAdmin: true,
    };
    try {
        const [newAdmin, created] = await User.findOrCreate({ where: { email: adminData.email }, defaults: { password: await bcrypt.hash(adminData.password, 10), firstName: adminData.firstName, lastName: adminData.lastName, isAdmin: adminData.isAdmin }, raw: true });
        created ? console.log(`Admin "${newAdmin.firstName}" was successfully created`) : console.log(`Admin "${newAdmin.firstName}" is already exist`);
    } catch (error) {
        console.log(error);
    }
}

createAdmin();
