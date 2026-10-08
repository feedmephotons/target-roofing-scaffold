import assert from 'node:assert/strict'
import posts from '../src/data/blogs.json' with { type: 'json' }
const origin=process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:3024'
const portfolio=await (await fetch(origin+'/our-projects')).text()
const markup=portfolio.replace(/<script\b[\s\S]*?<\/script>/g,'')
assert.ok(!/<article[^>]*class="[^"]*opacity-0/.test(markup),'portfolio cards initially visible')
assert.match(markup,/role="button" tabindex="0" aria-label="View Willow Glen project"/)
assert.match(markup,/>98</)
assert.match(markup,/>14</)
for(const post of posts){
 const response=await fetch(origin+'/target-news/'+post.slug)
 assert.equal(response.status,200)
 const html=await response.text()
 const data=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>JSON.parse(x[1]))
 const graph=data.find(x=>x['@graph'])?.['@graph']
 assert.ok(graph,post.slug)
 const article=graph.find(x=>x['@type']==='BlogPosting')
 assert.equal(article.headline,post.title)
 assert.equal(article.datePublished,post.date)
 assert.equal(article.dateModified,post.updatedAt)
 assert.equal(graph.find(x=>x['@type']==='BreadcrumbList').itemListElement[2].item,article.mainEntityOfPage)
}
console.log('PASS portfolio initial visibility, accurate stats, keyboard controls and all '+posts.length+' article schemas')
