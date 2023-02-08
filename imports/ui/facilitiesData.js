export const Facilities = [
  {
    name: "Mayo Clinic",
    address: {
      street: "5777 E Mayo Blvd",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85054",
    },
    getFullAddress() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    },
    phoneNumber: "+14803422000",
    hours: "Open 24 hours",
    website: "https://www.mayoclinic.org/",
  },
  {
    name: "HonorHealth Deer Valley Medical Center",
    address: {
      street: "19829 N 27th Ave",
      city: "Phoenix",
      state: "AZ",
      zipCode: "85027",
    },
    getFullAddress() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    },
    phoneNumber: "+1 (623) 879-6100",
    hours: "Open 24 hours",
    website: "https://www.honorhealth.com/",
  },
  {
    name: "New York Presbyterian Hospital",
    address: {
      street: "520 E 70th S",
      city: "New York",
      state: "NY",
      zipCode: "10021",
    },
    getFullAddress() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    },
    phoneNumber: "+1 (212) 746-5454",
    hours: "Open 24 hours",
    website: "https://www.nyp.org/",
  },
  {
    name: "Dignity Health - California Hospital Medical Center",
    address: {
      street: "1401 S Grand Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90015",
    },
    getFullAddress() {
      return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
    },
    phoneNumber: "+1 (213) 748-2411",
    hours: "Open 24 hours",
    website: "/https://locations.dignityhealth.org/",
  },
]