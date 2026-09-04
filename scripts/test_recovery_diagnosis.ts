import { querySiteIntelligence } from '../src/services/recoveryAgent.ts';

console.log('================================================================');
console.log('DIAGNOSIS TEST 1: RECOVERY AGENT - SEVERE WEATHER / POUR QUERY');
console.log('================================================================');
const query1 = "What is the concrete pour recovery strategy if rain starts at 1:45 PM?";
const result1 = querySiteIntelligence(query1);
console.log(JSON.stringify(result1, null, 2));

console.log('\n================================================================');
console.log('DIAGNOSIS TEST 2: RECOVERY AGENT - STEEL REBAR BUFFER DEPLETION QUERY');
console.log('================================================================');
const query2 = "How do we recover from the TMT 16mm rebar stock buffer depletion for Level 4 columns?";
const result2 = querySiteIntelligence(query2);
console.log(JSON.stringify(result2, null, 2));

console.log('\n================================================================');
console.log('DIAGNOSIS VERIFICATION CHECK:');
console.log('- Query 1 Responding Agent:', result1.respondingAgentName);
console.log('- Query 2 Responding Agent:', result2.respondingAgentName);
console.log('- Query 1 Grounding Count:', result1.grounded_in.length, 'entries');
console.log('- Query 2 Grounding Count:', result2.grounded_in.length, 'entries');
console.log('- Are summaries different?', result1.summary !== result2.summary);
console.log('- Are grounded_in tags disjoint?', JSON.stringify(result1.grounded_in) !== JSON.stringify(result2.grounded_in));
console.log('- Are recommended options distinct?', result1.recommendedOptions?.[0].costImpact !== result2.recommendedOptions?.[0].costImpact);
console.log('================================================================');
