import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../../entities/url.entity';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

@Injectable()
export class UrlService {
    private baseUrl:string = 'https://mobile.ly/';

    constructor(
        @InjectRepository(Url)
        private urlRepository: Repository<Url>,
    ) {}

    save(url: string) {
        if(!url) {
            throw new Error("Invalid url");
        }

        const uniqueHash = this.baseUrl + randomBytes(4).toString('hex');

        return this.urlRepository.save({url_orig: url, url_new: uniqueHash});
    }

    findAll(): Promise<Url[]> {
        return this.urlRepository.find();
    }

}
