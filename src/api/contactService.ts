import api from "./axiosInstance";

interface IContact {
    fullName: string;
    email: string;
    message: string;
}

export const contactApi = async (fullName: string, email: string, message: string): Promise<any> => {
    const formData: IContact = { fullName, email, message };
    const { data } = await api.post("/contact", formData);
    return data;
};
