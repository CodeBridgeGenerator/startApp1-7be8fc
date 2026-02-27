
import { faker } from "@faker-js/faker";
export default (user,count,highwayIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
highway: highwayIds[i % highwayIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
