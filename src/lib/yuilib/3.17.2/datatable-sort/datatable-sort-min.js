/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatable-sort",function(e,t){function l(){}var n=e.Lang,r=n.isBoolean,i=n.isString,s=n.isArray,o=n.isObject,u=e.Array,a=n.sub,f={asc:1,desc:-1,1:1,"-1":-1};l.ATTRS={sortable:{value:"auto",validator:"_validateSortable"},sortBy:{validator:"_validateSortBy",getter:"_getSortBy"},strings:{}},e.mix(l.prototype,{sort:function(t,n){return this.fire("sort",e.merge(n||{},{sortBy:t||this.get("sortBy")}))},SORTABLE_HEADER_TEMPLATE:'<div class="{className}" tabindex="0" unselectable="on"><span class="{indicatorClass}"></span></div>',toggleSort:function(t,n){var r=this._sortBy,i=[],s,o,a,f,l;for(s=0,o=r.length;s<o;++s)f={},f[r[s]._id]=r[s].sortDir,i.push(f);if(t){t=u(t);for(s=0,o=t.length;s<o;++s){f=t[s],l=-1;for(a=i.length-1;s>=0;--s)if(i[a][f]){i[a][f]*=-1;break}}}else for(s=0,o=i.length;s<o;++s)for(f in i[s])if(i[s].hasOwnProperty(f)){i[s][f]*=-1;break}return this.fire("sort",e.merge(n||{},{sortBy:i}))},_afterSortByChange:function(){this._setSortBy(),this._sortBy.length&&(this.data.comparator||(this.data.comparator=this._sortComparator),this.data.sort())},_afterSortDataChange:function(e){(e.prevVal!==e.newVal||e.newVal.hasOwnProperty("_compare"))&&this._initSortFn()},_afterSortRecordChange:function(e){var t,n;for(t=0,n=this._sortBy.length;t<n;++t)if(e.changed[this._sortBy[t].key]){this.data.sort();break}},_bindSortUI:function(){var t=this._eventHandles;t.sortAttrs||(t.sortAttrs=this.after(["sortableChange","sortByChange","columnsChange"],e.bind("_uiSetSortable",this))),!t.sortUITrigger&&this._theadNode&&(t.sortUITrigger=this.delegate(["click","keydown"],e.rbind("_onUITriggerSort",this),"."+this.getClassName("sortable","column")))},_defSortFn:function(e){this.set.apply(this,["sortBy",e.sortBy].concat(e.details))},_getSortBy:function(e,t){var n,r,i,s;t=t.slice(7);if(t==="state"){n=[];for(r=0,i=this._sortBy.length;r<i;++r)s=this._sortBy[r],n.push({column:s._id,dir:s.sortDir});return{state:n.length===1?n[0]:n}}return e},initializer:function(){var t=e.bind("_parseSortable",this);this._parseSortable(),this._setSortBy(),this._initSortFn(),this._initSortStrings(),this.after({"table:renderHeader":e.bind("_renderSortable",this),dataChange:e.bind("_afterSortDataChange",this),sortByChange:e.bind("_afterSortByChange",this),sortableChange:t,columnsChange:t}),this.data.after(this.data.model.NAME+":change",e.bind("_afterSortRecordChange",this)),this.publish("sort",{defaultFn:e.bind("_defSortFn",this)})},_initSortFn:function(){var e=this;this.data._compare=function(t,n){var r=0,i,s,o,u,a,f,l;for(i=0,s=e._sortBy.length;!r&&i<s;++i)o=e._sortBy[i],u=o.sortDir,a=o.caseSensitive,o.sortFn?r=o.sortFn(t,n,u===-1):(f=t.get(o.key)||"",l=n.get(o.key)||"",!a&&typeof f=="string"&&typeof l=="string"&&(f=f.toLowerCase(),l=l.toLowerCase()),r=f>l?u:f<l?-u:0);return r},this._sortBy.length?(this.data.comparator=this._sortComparator,this.data.sort()):delete this.data.comparator},_initSortStrings:function(){this.set("strings",e.mix(this.get("strings")||{},e.Intl.get("datatable-sort")))},_onUITriggerSort:function(e){var t=e.currentTarget.getAttribute("data-yui3-col-id"),n=t&&this.getColumn(t),r,i,s;if(e.type==="keydown"&&e.keyCode!==32)return;e.preventDefault();if(n){if(e.shiftKey){r=this.get("sortBy")||[];for(i=0,s=r.length;i<s;++i)if(t===r[i]||Math.abs(r[i][t])===1){o(r[i])||(r[i]={}),r[i][t]=-(n.sortDir||0)||1;break}i>=s&&r.push(n._id)}else r=[{}],r[0][t]=-(n.sortDir||0)||1;this.fire("sort",{originEvent:e,sortBy:r})}},_parseSortable:function(){var e=this.get("sortable"),t=[],n,r,i;if(s(e))for(n=0,r=e.length;n<r;++n){i=e[n];if(!o(i,!0)||s(i))i=this.getColumn(i);i&&t.push(i)}else if(e){t=this._displayColumns.slice();if(e==="auto")for(n=t.length-1;n>=0;--n)t[n].sortable||t.splice(n,1)}this._sortable=t},_renderSortable:function(){this._uiSetSortable(),this._bindSortUI()},_setSortBy:function(){var e=this._displayColumns,t=this.get("sortBy")||[],n=" "+this.getClassName("sorted"),r,i,s,a,l,c;this._sortBy=[];for(r=0,i=e.length;r<i;++r)c=e[r],delete c.sortDir,c.className&&(c.className=c.className.replace(n,""));t=u(t);for(r=0,i=t.length;r<i;++r){s=t[r],a=1;if(o(s)){l=s;for(s in l)if(l.hasOwnProperty(s)){a=f[l[s]];break}}s&&(c=this.getColumn(s)||{_id:s,key:s},c&&(c.sortDir=a,c.className||(c.className=""),c.className+=n,this._sortBy.push(c)))}},_sortComparator:function(e){return e},_uiSetSortable:function(){var t=this._sortable||[],n=this.getClassName("sortable","column"),r=this.getClassName("sorted"),i=this.getClassName("sorted","desc"),s=this.getClassName("sort","liner"),o=this.getClassName("sort","indicator"),u={},f,l,c,h,p,d,v;this.get("boundingBox").toggleClass(this.getClassName("sortable"),t.length);for(f=0,l=t.length;f<l;++f)u[t[f].id]=t[f];this._theadNode.all("."+n).each(function(e){var t=u[e.get("id")],a=e.one("."+s),f;t?t.sortDir||e.removeClass(r).removeClass(i):(e.removeClass(n).removeClass(r).removeClass(i),a&&a.replace(a.get("childNodes").toFrag()),f=e.one("."+o),f&&f.remove().destroy(!0))});for(f=0,l=t.length;f<l;++f)c=t[f],h=this._theadNode.one("#"+c.id),v=c.sortDir===-1,h&&(p=h.one("."+s),h.addClass(n),c.sortDir&&(h.addClass(r),h.toggleClass(i,v),h.setAttribute("aria-sort",v?"descending":"ascending")),p||(p=e.Node.create(e.Lang.sub(this.SORTABLE_HEADER_TEMPLATE,{className:s,indicatorClass:o})),p.prepend(h.get("childNodes").toFrag()),h.append(p)),d=a(this.getString(c.sortDir===1?"reverseSortBy":"sortBy"),{title:c.title||"",key:c.key||"",abbr:c.abbr||"",label:c.label||"",column:c.abbr||c.label||c.key||"column "+f}),h.setAttribute("title",d),h.setAttribute("aria-labelledby",c.id))},_validateSortable:function(e){return e==="auto"||r(e)||s(e)},_validateSortBy:function(e){return e===null||i(e)||o(e,!0)||s(e)&&(i(e[0])||o(e,!0))}},!0),e.DataTable.Sortable=l,e.Base.mix(e.DataTable,[l])},"3.17.2",{requires:["datatable-base"],lang:["en","fr","es","hu"],skinnable:!0});
