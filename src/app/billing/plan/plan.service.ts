import { Injectable } from '@angular/core';

@Injectable()
export class PlanService {
  constructor() { }

  getPlans() {
    const plans = [
      { id: 'personal', name: 'Personal', price: 0 },
      { id: 'professional', name: 'Professional', price: 4.99 },
      { id: 'enterprise', name: 'Enterprise', price: 9.99 },
      { id: 'extreme', name: 'Extreme', price: 19.9 }
    ];
    return plans;
  }
}
