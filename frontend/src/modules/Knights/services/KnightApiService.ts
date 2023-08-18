import apiClient from "../../../services/api";
import type KnightInterface from "../interfaces/KnightInterface";
import type { KnightFiltersInterface } from "../components/list/interfaces/KnightFiltersInterface";

class KnightApiService {
    async getAll(filters: KnightFiltersInterface = {}): Promise<any> {
        const options = {
            params: filters
        }
        return apiClient.get("/knights", options);
    }

    async get(id: string): Promise<any> {
        return apiClient.get(`/knights/${id}`);
    }

    async create(data: KnightInterface): Promise<any> {
        return apiClient.post("/knights", data);
    }

    async update(id: any, data: any): Promise<any> {
        return apiClient.patch(`/knights/${id}`, data);
    }

    async delete(id: string): Promise<any> {
        return apiClient.delete(`/knights/${id}`);
    }
}

export default new KnightApiService();