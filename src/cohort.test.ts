import {it,expect} from 'vitest';
import {rows} from './metrics';
it('keeps every sample cohort internally consistent',()=>{for(const row of rows)for(const c of [row.current,row.previous]){expect(c.activated).toBeLessThanOrEqual(c.signups);expect(c.paid).toBeLessThanOrEqual(c.activated);expect(c.eligiblePaid).toBeLessThanOrEqual(c.paid);expect(c.retained).toBeLessThanOrEqual(c.eligiblePaid);expect(c.featureUsers).toBeLessThanOrEqual(c.activeAccounts);}});
