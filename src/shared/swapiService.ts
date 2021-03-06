import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.SWAPI_BASE_URL;

export class SwapiService {
    private handleError(error: Error | AxiosError): void {
        if (error.message) {
            throw error;
        }

        throw new Error((error as AxiosError).response.data.message);
    }

    /**
     * This method returns all the star wars movies
     */
    async fetchMovies(): Promise<any> {
        try {
            const { data } = await axios.get('/films');
            return data.results;
        } catch (error) {
            console.log(error);
            this.handleError(error);
        }
    }

    /**
     * This method returns a single the star wars episode
     * 
     * @param { string } episodeId - The ID of an episode
     */
     async fetchMovie(episodeId: string): Promise<any> {
        try {
            const { data } = await axios.get(`/films/${episodeId}`);
            return data;
        } catch (error) {
            console.log(error);
            this.handleError(error);
        }
    }

    /**
     * This method returns all the star wars characters
     */
     async fetchCharacters(): Promise<any> {
        try {
            const { data } = await axios.get('/people');
            return data.results;
        } catch (error) {
            console.log(error);
            this.handleError(error);
        }
    }
}