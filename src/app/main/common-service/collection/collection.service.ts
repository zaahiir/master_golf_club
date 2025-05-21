import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private amenities: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType);
    this.lists = this.apiUrl + "course/0/listing/";
    this.processing = this.apiUrl + "course/0/processing/";
    this.deletion = this.apiUrl + "course/0/deletion/";
    this.amenities = this.apiUrl + "amenities/";
  }

  listCourse(id: string = '0') {
    return axios.get(this.lists.replace('0', id));
  }

  processCourse(data: any, id: string = '0') {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    return axios.post(this.processing.replace('0', id), data, config);
  }

  deleteCourse(id: string) {
    return axios.get(this.deletion.replace('0', id));
  }

  getAmenities() {
    return axios.get(this.amenities);
  }
}
