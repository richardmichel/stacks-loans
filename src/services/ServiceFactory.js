import UserService from "@services/user/UserService";
const services = {
    user: UserService
};
export const ServiceFactory = {
    get: name => services[name]
};
