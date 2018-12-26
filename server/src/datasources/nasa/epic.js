import { RESTDataSource } from 'apollo-datasource-rest';
import moment from 'moment';

class NASAEpicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://epic.gsfc.nasa.gov/api/enhanced/date/';
    this.imageUrl = 'https://epic.gsfc.nasa.gov/archive/enhanced';
  }

  async getEpicList(date) {
    const res = await this.get(`${date}`);
    return res && res.length ? res.map((e) => this.epicListReducer(e)) : [];
  }

  async testResolver(name) {
    return { message: `hello ${name}` };
  }

  epicListReducer(epic) {
    const {
      identifier,
      caption,
      image,
      coords,
      date,
      centroid_coordinates,
      dscovr_j2000_position
    } = epic;
    const imgDate = moment(date, 'YYYY-MM-DD');
    let imgMonth = imgDate.month() + 1;
    if (imgMonth <= 9) {
      imgMonth = `0${imgMonth}`;
    }
    let imgDay = imgDate.date();

    if (imgDay <= 9) {
      imgDay = `0${imgDay}`;
    }
    const epicImageUrl = `${
      this.imageUrl
    }/${imgDate.year()}/${imgMonth}/${imgDay}`;

    return {
      identifier,
      caption,
      image,
      date,
      coords: {
        lat: centroid_coordinates.lat,
        lon: centroid_coordinates.lon
      },
      sat_pos: {
        x: dscovr_j2000_position.x,
        y: dscovr_j2000_position.y,
        z: dscovr_j2000_position.z
      },
      image_locations: {
        thumb: `${epicImageUrl}/thumbs/${image}.jpg`,
        jpg: `${epicImageUrl}/jpg/${image}.jpg`,
        png: `${epicImageUrl}/png/${image}.png`
      }
    };
  }
}

export default NASAEpicAPI;
