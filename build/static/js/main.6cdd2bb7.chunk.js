(this["webpackJsonpex2.6"]=this["webpackJsonpex2.6"]||[]).push([[0],{37:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(14),o=t.n(c),r=t(3),u=t(2),a=t(4),i=t.n(a),s="/api/persons",l=function(){return i.a.get(s).then((function(e){return e.data}))},j=function(e){return i.a.post(s,e).then((function(e){return e.data}))},d=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},b=(t(37),t(0)),h=function(e){var n=e.person,t=e.deleteInfo;return Object(b.jsxs)("div",{children:[n.name," ",n.number," ",Object(b.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},O=function(e){var n=e.persons,t=e.deleteInfo;return Object(b.jsx)("div",{children:n.map((function(e){return Object(b.jsx)(h,{person:e,deleteInfo:t},e.name)}))})},m=function(e){var n=e.message;return null===n?null:Object(b.jsx)("div",{className:"info",children:n})},x=function(e){var n=e.message;return null===n?null:Object(b.jsx)("div",{className:"error",children:n})},v=function(){var e=Object(u.useState)([]),n=Object(r.a)(e,2),t=n[0],c=n[1],o=Object(u.useState)(""),a=Object(r.a)(o,2),i=a[0],s=a[1],h=Object(u.useState)(""),v=Object(r.a)(h,2),p=v[0],g=v[1],w=Object(u.useState)(null),I=Object(r.a)(w,2),S=I[0],y=I[1],C=Object(u.useState)(null),k=Object(r.a)(C,2),A=k[0],N=k[1];Object(u.useEffect)((function(){l().then((function(e){c(e)}))}),[]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(m,{message:S}),Object(b.jsx)(x,{message:A}),"filter shown with ",Object(b.jsx)("input",{onChange:function(e){c(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value)})))}}),Object(b.jsx)("h2",{children:"Add a new contact"}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n={name:i,number:p},o=t.findIndex((function(e){return e.name===i})),r=o+1;-1!==o?window.confirm("Do you want to update the information for ".concat(i,"?"))&&d(r,n).then((function(e){c(t.map((function(n){return n.id!==r?n:e})))})):j(n).then((function(e){c(t.concat(e)),y("Added ".concat(n.name)),setTimeout((function(){y(null)}),3e3)})).catch((function(e){N("".concat(e.response.data.error)),setTimeout((function(){N(null)}),3e3)})),s(""),g("")},children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:i,onChange:function(e){console.log(e.target.value),s(e.target.value)}})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:p,onChange:function(e){console.log(e.target.value),g(e.target.value)}})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)("div",{children:Object(b.jsx)(O,{persons:t,deleteInfo:function(e){console.log("person",e),window.confirm("Are you sure you want to delete ".concat(e.name," from contacts?"))&&f(e.id).then(c(t.filter((function(n){return n.id!==e.id}))))}})})]})};o.a.render(Object(b.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.6cdd2bb7.chunk.js.map