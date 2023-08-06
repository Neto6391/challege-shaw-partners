class Repository {
    public id: number;
    public name: string;
    public url: string;
  
    constructor(data: any) {
      this.id = data.id;
      this.name = data.name;
      this.url = data.html_url;
    }
  }
  
  export default Repository;
  