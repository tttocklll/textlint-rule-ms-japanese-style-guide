"use strict";
const chouon = require('./chouon')

const checkNoSpace = (text) => {
    const noSpace_before = /[^a-zA-Z0-9!-\/:-@¥[-`{-~\s]([a-zA-Z0-9!-\/:-@¥[-`{-~])+?/gm
    const noSpace_after = /[a-zA-Z0-9!-\/:-@¥[-`{-~]+?[^a-zA-Z0-9!-\/:-@¥[-`{-~\s]/gm
        
    const matches_b = noSpace_before.exec(text)
    const matches_a = noSpace_after.exec(text)
    let results = []
    if(matches_b) {
        results.push({
            message: "スペースが必要です",
            index: matches_b.index
        })
    }
    if(matches_a) {
        results.push({
            message: "スペースが必要です",
            index: matches_a.index
        })
    }
    return results
}

module.exports = function(context, options = {}) {
    const {Syntax, RuleError, report, getSource} = context;
    return {
        [Syntax.Str](node){ // "Str" node
            const text = getSource(node); // Get text
            chouon.forEach( c => {
                const matches = new RegExp(c + "[^ー$]", 'gm' ).exec(text); // Found "bugs"
                if (!matches) {
                    return;
                }
                const indexOfBugs = matches.index;
                const ruleError = new RuleError(`${c} に長音記号が必要です`, {
                    index: indexOfBugs // padding of index
                });
                report(node, ruleError);                
            });
            
            const results = checkNoSpace(text)
            results.forEach( r => {
                const ruleError = new RuleError(r.message, {index: r.index})
                report(node, ruleError)
            })
        }
    }
};
