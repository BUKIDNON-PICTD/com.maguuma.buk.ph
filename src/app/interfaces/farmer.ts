export interface Farmer {
  postnametitle: string;
  prenametitle: string;
  objid: string;
  state: string;
  fno: string;
  nameextension: string;
  maidenname: string;
  farmer: {
    civilstatus: string;
    gender: string;
    address: {
      text: string;
    };
    email: string;
    phoneno: string;
    mobileno: string;
    birthplace: string;
    firstname: string;
    lastname: string;
    citizenship: string;
    middlename: string;
    objid: string;
    birthdate: string;
    name: string;
  };
  recordlog: {
    lastupdatedbyuserid: string;
    lastupdatedbyuser: string;
    createdbyuserid: string;
    createdbyuser: string;
    datecreated: string;
    dateoflastupdate: string;
  };
  spouse: {
    objid: string;
  };
  farmlocations: [
    {
      areasqm: string;
      farmerprofileid: string;
      pin: string;
      modeofacquisition: string;
      objid: string;
      location: {
        text: string;
      };
    }
  ];
  farmfacilities: [];
}

