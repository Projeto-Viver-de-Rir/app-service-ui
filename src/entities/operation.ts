export class createEventRequest {    
    constructor(
      public monthToGenerate: Date
    ) {}
  }

  export class createDebtsRequest {    
    constructor(
      public startsAt: Date,
      public endsAt: Date,
    ) {}
  }