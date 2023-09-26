export class Admin {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isPrimaryAdmin: number;

    initialize() {
        this.id = null;
        this.email = "";
        this.firstName = "";
        this.lastName = "";
        this.password = "";
        this.isPrimaryAdmin = 1;
    }

    initializeExisting(admin: Admin) {
        this.id = admin.id;
        this.email = admin.email;
        this.firstName = admin.firstName;
        this.lastName = admin.lastName;
        this.password = admin.password;
        this.isPrimaryAdmin = 1;
    }
}
