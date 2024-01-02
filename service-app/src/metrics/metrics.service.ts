import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
    #url = new URL('http://localhost:3001/metrics');

    pushMetric(name: string, value?: any): boolean {
        fetch(this.#url, {
            method: 'post',
            body: JSON.stringify({
                name,
                value
            })
        });
        return true;
    }

    async getMetrics() {
        return await (await fetch(this.#url)).json();
    }
}
