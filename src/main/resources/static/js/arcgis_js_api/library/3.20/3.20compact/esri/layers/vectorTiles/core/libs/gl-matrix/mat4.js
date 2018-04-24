// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/libs/gl-matrix/mat4",["./common"],function(q){var k={scalar:{},SIMD:{},create:function(){var a=new q.ARRAY_TYPE(16);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a},clone:function(a){var b=new q.ARRAY_TYPE(16);b[0]=a[0];b[1]=a[1];b[2]=a[2];b[3]=a[3];b[4]=a[4];b[5]=a[5];b[6]=a[6];b[7]=a[7];b[8]=a[8];b[9]=a[9];b[10]=a[10];b[11]=a[11];b[12]=a[12];b[13]=a[13];b[14]=a[14];b[15]=a[15];return b},
copy:function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];a[8]=b[8];a[9]=b[9];a[10]=b[10];a[11]=b[11];a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a},fromValues:function(a,b,c,d,f,g,e,m,h,l,n,p,k,t,v,u){var r=new q.ARRAY_TYPE(16);r[0]=a;r[1]=b;r[2]=c;r[3]=d;r[4]=f;r[5]=g;r[6]=e;r[7]=m;r[8]=h;r[9]=l;r[10]=n;r[11]=p;r[12]=k;r[13]=t;r[14]=v;r[15]=u;return r},set:function(a,b,c,d,f,g,e,m,h,l,n,p,k,t,v,u,r){a[0]=b;a[1]=c;a[2]=d;a[3]=f;a[4]=g;a[5]=e;a[6]=
m;a[7]=h;a[8]=l;a[9]=n;a[10]=p;a[11]=k;a[12]=t;a[13]=v;a[14]=u;a[15]=r;return a},identity:function(a){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a}};k.scalar.transpose=function(a,b){if(a===b){var c=b[1],d=b[2],f=b[3],g=b[6],e=b[7],m=b[11];a[1]=b[4];a[2]=b[8];a[3]=b[12];a[4]=c;a[6]=b[9];a[7]=b[13];a[8]=d;a[9]=g;a[11]=b[14];a[12]=f;a[13]=e;a[14]=m}else a[0]=b[0],a[1]=b[4],a[2]=b[8],a[3]=b[12],a[4]=b[1],a[5]=b[5],a[6]=
b[9],a[7]=b[13],a[8]=b[2],a[9]=b[6],a[10]=b[10],a[11]=b[14],a[12]=b[3],a[13]=b[7],a[14]=b[11],a[15]=b[15];return a};k.SIMD.transpose=function(a,b){var c,d,f,g,e,m,h;c=SIMD.Float32x4.load(b,0);d=SIMD.Float32x4.load(b,4);f=SIMD.Float32x4.load(b,8);g=SIMD.Float32x4.load(b,12);e=SIMD.Float32x4.shuffle(c,d,0,1,4,5);m=SIMD.Float32x4.shuffle(f,g,0,1,4,5);h=SIMD.Float32x4.shuffle(e,m,0,2,4,6);e=SIMD.Float32x4.shuffle(e,m,1,3,5,7);SIMD.Float32x4.store(a,0,h);SIMD.Float32x4.store(a,4,e);e=SIMD.Float32x4.shuffle(c,
d,2,3,6,7);m=SIMD.Float32x4.shuffle(f,g,2,3,6,7);c=SIMD.Float32x4.shuffle(e,m,0,2,4,6);d=SIMD.Float32x4.shuffle(e,m,1,3,5,7);SIMD.Float32x4.store(a,8,c);SIMD.Float32x4.store(a,12,d);return a};k.transpose=q.USE_SIMD?k.SIMD.transpose:k.scalar.transpose;k.scalar.invert=function(a,b){var c=b[0],d=b[1],f=b[2],g=b[3],e=b[4],m=b[5],h=b[6],l=b[7],n=b[8],p=b[9],k=b[10],t=b[11],v=b[12],u=b[13],r=b[14],B=b[15],q=c*m-d*e,y=c*h-f*e,w=c*l-g*e,x=d*h-f*m,C=d*l-g*m,D=f*l-g*h,E=n*u-p*v,F=n*r-k*v,G=n*B-t*v,I=p*r-k*
u,J=p*B-t*u,K=k*B-t*r,A=q*K-y*J+w*I+x*G-C*F+D*E;if(!A)return null;A=1/A;a[0]=(m*K-h*J+l*I)*A;a[1]=(f*J-d*K-g*I)*A;a[2]=(u*D-r*C+B*x)*A;a[3]=(k*C-p*D-t*x)*A;a[4]=(h*G-e*K-l*F)*A;a[5]=(c*K-f*G+g*F)*A;a[6]=(r*w-v*D-B*y)*A;a[7]=(n*D-k*w+t*y)*A;a[8]=(e*J-m*G+l*E)*A;a[9]=(d*G-c*J-g*E)*A;a[10]=(v*C-u*w+B*q)*A;a[11]=(p*w-n*C-t*q)*A;a[12]=(m*F-e*I-h*E)*A;a[13]=(c*I-d*F+f*E)*A;a[14]=(u*y-v*x-r*q)*A;a[15]=(n*x-p*y+k*q)*A;return a};k.SIMD.invert=function(a,b){var c,d,f,g,e,m,h,l,n;m=SIMD.Float32x4.load(b,0);
h=SIMD.Float32x4.load(b,4);l=SIMD.Float32x4.load(b,8);n=SIMD.Float32x4.load(b,12);e=SIMD.Float32x4.shuffle(m,h,0,1,4,5);d=SIMD.Float32x4.shuffle(l,n,0,1,4,5);c=SIMD.Float32x4.shuffle(e,d,0,2,4,6);d=SIMD.Float32x4.shuffle(d,e,1,3,5,7);e=SIMD.Float32x4.shuffle(m,h,2,3,6,7);g=SIMD.Float32x4.shuffle(l,n,2,3,6,7);f=SIMD.Float32x4.shuffle(e,g,0,2,4,6);g=SIMD.Float32x4.shuffle(g,e,1,3,5,7);e=SIMD.Float32x4.mul(f,g);e=SIMD.Float32x4.swizzle(e,1,0,3,2);m=SIMD.Float32x4.mul(d,e);h=SIMD.Float32x4.mul(c,e);e=
SIMD.Float32x4.swizzle(e,2,3,0,1);m=SIMD.Float32x4.sub(SIMD.Float32x4.mul(d,e),m);h=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,e),h);h=SIMD.Float32x4.swizzle(h,2,3,0,1);e=SIMD.Float32x4.mul(d,f);e=SIMD.Float32x4.swizzle(e,1,0,3,2);m=SIMD.Float32x4.add(SIMD.Float32x4.mul(g,e),m);n=SIMD.Float32x4.mul(c,e);e=SIMD.Float32x4.swizzle(e,2,3,0,1);m=SIMD.Float32x4.sub(m,SIMD.Float32x4.mul(g,e));n=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,e),n);n=SIMD.Float32x4.swizzle(n,2,3,0,1);e=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(d,
2,3,0,1),g);e=SIMD.Float32x4.swizzle(e,1,0,3,2);f=SIMD.Float32x4.swizzle(f,2,3,0,1);m=SIMD.Float32x4.add(SIMD.Float32x4.mul(f,e),m);l=SIMD.Float32x4.mul(c,e);e=SIMD.Float32x4.swizzle(e,2,3,0,1);m=SIMD.Float32x4.sub(m,SIMD.Float32x4.mul(f,e));l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,e),l);l=SIMD.Float32x4.swizzle(l,2,3,0,1);e=SIMD.Float32x4.mul(c,d);e=SIMD.Float32x4.swizzle(e,1,0,3,2);l=SIMD.Float32x4.add(SIMD.Float32x4.mul(g,e),l);n=SIMD.Float32x4.sub(SIMD.Float32x4.mul(f,e),n);e=SIMD.Float32x4.swizzle(e,
2,3,0,1);l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(g,e),l);n=SIMD.Float32x4.sub(n,SIMD.Float32x4.mul(f,e));e=SIMD.Float32x4.mul(c,g);e=SIMD.Float32x4.swizzle(e,1,0,3,2);h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(f,e));l=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,e),l);e=SIMD.Float32x4.swizzle(e,2,3,0,1);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(f,e),h);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(d,e));e=SIMD.Float32x4.mul(c,f);e=SIMD.Float32x4.swizzle(e,1,0,3,2);h=SIMD.Float32x4.add(SIMD.Float32x4.mul(g,e),
h);n=SIMD.Float32x4.sub(n,SIMD.Float32x4.mul(d,e));e=SIMD.Float32x4.swizzle(e,2,3,0,1);h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(g,e));n=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,e),n);c=SIMD.Float32x4.mul(c,m);c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,2,3,0,1),c);c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,1,0,3,2),c);e=SIMD.Float32x4.reciprocalApproximation(c);c=SIMD.Float32x4.sub(SIMD.Float32x4.add(e,e),SIMD.Float32x4.mul(c,SIMD.Float32x4.mul(e,e)));c=SIMD.Float32x4.swizzle(c,0,0,0,0);if(!c)return null;
SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(c,m));SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(c,h));SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(c,l));SIMD.Float32x4.store(a,12,SIMD.Float32x4.mul(c,n));return a};k.invert=q.USE_SIMD?k.SIMD.invert:k.scalar.invert;k.scalar.adjoint=function(a,b){var c=b[0],d=b[1],f=b[2],g=b[3],e=b[4],m=b[5],h=b[6],l=b[7],n=b[8],p=b[9],k=b[10],t=b[11],v=b[12],u=b[13],r=b[14],q=b[15];a[0]=m*(k*q-t*r)-p*(h*q-l*r)+u*(h*t-l*k);a[1]=-(d*(k*q-t*r)-p*(f*q-g*r)+u*(f*t-g*k));a[2]=
d*(h*q-l*r)-m*(f*q-g*r)+u*(f*l-g*h);a[3]=-(d*(h*t-l*k)-m*(f*t-g*k)+p*(f*l-g*h));a[4]=-(e*(k*q-t*r)-n*(h*q-l*r)+v*(h*t-l*k));a[5]=c*(k*q-t*r)-n*(f*q-g*r)+v*(f*t-g*k);a[6]=-(c*(h*q-l*r)-e*(f*q-g*r)+v*(f*l-g*h));a[7]=c*(h*t-l*k)-e*(f*t-g*k)+n*(f*l-g*h);a[8]=e*(p*q-t*u)-n*(m*q-l*u)+v*(m*t-l*p);a[9]=-(c*(p*q-t*u)-n*(d*q-g*u)+v*(d*t-g*p));a[10]=c*(m*q-l*u)-e*(d*q-g*u)+v*(d*l-g*m);a[11]=-(c*(m*t-l*p)-e*(d*t-g*p)+n*(d*l-g*m));a[12]=-(e*(p*r-k*u)-n*(m*r-h*u)+v*(m*k-h*p));a[13]=c*(p*r-k*u)-n*(d*r-f*u)+v*(d*
k-f*p);a[14]=-(c*(m*r-h*u)-e*(d*r-f*u)+v*(d*h-f*m));a[15]=c*(m*k-h*p)-e*(d*k-f*p)+n*(d*h-f*m);return a};k.SIMD.adjoint=function(a,b){var c,d,f,g,e,m,h,l,n;c=SIMD.Float32x4.load(b,0);d=SIMD.Float32x4.load(b,4);f=SIMD.Float32x4.load(b,8);g=SIMD.Float32x4.load(b,12);h=SIMD.Float32x4.shuffle(c,d,0,1,4,5);m=SIMD.Float32x4.shuffle(f,g,0,1,4,5);e=SIMD.Float32x4.shuffle(h,m,0,2,4,6);m=SIMD.Float32x4.shuffle(m,h,1,3,5,7);h=SIMD.Float32x4.shuffle(c,d,2,3,6,7);d=SIMD.Float32x4.shuffle(f,g,2,3,6,7);c=SIMD.Float32x4.shuffle(h,
d,0,2,4,6);d=SIMD.Float32x4.shuffle(d,h,1,3,5,7);h=SIMD.Float32x4.mul(c,d);h=SIMD.Float32x4.swizzle(h,1,0,3,2);f=SIMD.Float32x4.mul(m,h);g=SIMD.Float32x4.mul(e,h);h=SIMD.Float32x4.swizzle(h,2,3,0,1);f=SIMD.Float32x4.sub(SIMD.Float32x4.mul(m,h),f);g=SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,h),g);g=SIMD.Float32x4.swizzle(g,2,3,0,1);h=SIMD.Float32x4.mul(m,c);h=SIMD.Float32x4.swizzle(h,1,0,3,2);f=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,h),f);n=SIMD.Float32x4.mul(e,h);h=SIMD.Float32x4.swizzle(h,2,3,0,1);
f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(d,h));n=SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,h),n);n=SIMD.Float32x4.swizzle(n,2,3,0,1);h=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(m,2,3,0,1),d);h=SIMD.Float32x4.swizzle(h,1,0,3,2);c=SIMD.Float32x4.swizzle(c,2,3,0,1);f=SIMD.Float32x4.add(SIMD.Float32x4.mul(c,h),f);l=SIMD.Float32x4.mul(e,h);h=SIMD.Float32x4.swizzle(h,2,3,0,1);f=SIMD.Float32x4.sub(f,SIMD.Float32x4.mul(c,h));l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,h),l);l=SIMD.Float32x4.swizzle(l,2,3,0,
1);h=SIMD.Float32x4.mul(e,m);h=SIMD.Float32x4.swizzle(h,1,0,3,2);l=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,h),l);n=SIMD.Float32x4.sub(SIMD.Float32x4.mul(c,h),n);h=SIMD.Float32x4.swizzle(h,2,3,0,1);l=SIMD.Float32x4.sub(SIMD.Float32x4.mul(d,h),l);n=SIMD.Float32x4.sub(n,SIMD.Float32x4.mul(c,h));h=SIMD.Float32x4.mul(e,d);h=SIMD.Float32x4.swizzle(h,1,0,3,2);g=SIMD.Float32x4.sub(g,SIMD.Float32x4.mul(c,h));l=SIMD.Float32x4.add(SIMD.Float32x4.mul(m,h),l);h=SIMD.Float32x4.swizzle(h,2,3,0,1);g=SIMD.Float32x4.add(SIMD.Float32x4.mul(c,
h),g);l=SIMD.Float32x4.sub(l,SIMD.Float32x4.mul(m,h));h=SIMD.Float32x4.mul(e,c);h=SIMD.Float32x4.swizzle(h,1,0,3,2);g=SIMD.Float32x4.add(SIMD.Float32x4.mul(d,h),g);n=SIMD.Float32x4.sub(n,SIMD.Float32x4.mul(m,h));h=SIMD.Float32x4.swizzle(h,2,3,0,1);g=SIMD.Float32x4.sub(g,SIMD.Float32x4.mul(d,h));n=SIMD.Float32x4.add(SIMD.Float32x4.mul(m,h),n);SIMD.Float32x4.store(a,0,f);SIMD.Float32x4.store(a,4,g);SIMD.Float32x4.store(a,8,l);SIMD.Float32x4.store(a,12,n);return a};k.adjoint=q.USE_SIMD?k.SIMD.adjoint:
k.scalar.adjoint;k.determinant=function(a){var b=a[0],c=a[1],d=a[2],f=a[3],g=a[4],e=a[5],m=a[6],h=a[7],l=a[8],n=a[9],k=a[10],q=a[11],t=a[12],v=a[13],u=a[14];a=a[15];return(b*e-c*g)*(k*a-q*u)-(b*m-d*g)*(n*a-q*v)+(b*h-f*g)*(n*u-k*v)+(c*m-d*e)*(l*a-q*t)-(c*h-f*e)*(l*u-k*t)+(d*h-f*m)*(l*v-n*t)};k.SIMD.multiply=function(a,b,c){var d=SIMD.Float32x4.load(b,0),f=SIMD.Float32x4.load(b,4),g=SIMD.Float32x4.load(b,8);b=SIMD.Float32x4.load(b,12);var e=SIMD.Float32x4.load(c,0),e=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,
0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,1,1,1,1),f),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,2,2,2),g),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,3,3,3,3),b))));SIMD.Float32x4.store(a,0,e);e=SIMD.Float32x4.load(c,4);e=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,1,1,1,1),f),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,2,2,2),g),
SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,3,3,3,3),b))));SIMD.Float32x4.store(a,4,e);e=SIMD.Float32x4.load(c,8);e=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,1,1,1,1),f),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,2,2,2),g),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,3,3,3,3),b))));SIMD.Float32x4.store(a,8,e);c=SIMD.Float32x4.load(c,12);d=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,
0,0,0,0),d),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,1,1,1,1),f),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,2,2,2,2),g),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,3,3,3,3),b))));SIMD.Float32x4.store(a,12,d);return a};k.scalar.multiply=function(a,b,c){var d=b[0],f=b[1],g=b[2],e=b[3],m=b[4],h=b[5],l=b[6],n=b[7],k=b[8],q=b[9],t=b[10],v=b[11],u=b[12],r=b[13],B=b[14];b=b[15];var z=c[0],y=c[1],w=c[2],x=c[3];a[0]=z*d+y*m+w*k+x*u;a[1]=z*f+y*h+w*q+x*r;a[2]=z*g+y*
l+w*t+x*B;a[3]=z*e+y*n+w*v+x*b;z=c[4];y=c[5];w=c[6];x=c[7];a[4]=z*d+y*m+w*k+x*u;a[5]=z*f+y*h+w*q+x*r;a[6]=z*g+y*l+w*t+x*B;a[7]=z*e+y*n+w*v+x*b;z=c[8];y=c[9];w=c[10];x=c[11];a[8]=z*d+y*m+w*k+x*u;a[9]=z*f+y*h+w*q+x*r;a[10]=z*g+y*l+w*t+x*B;a[11]=z*e+y*n+w*v+x*b;z=c[12];y=c[13];w=c[14];x=c[15];a[12]=z*d+y*m+w*k+x*u;a[13]=z*f+y*h+w*q+x*r;a[14]=z*g+y*l+w*t+x*B;a[15]=z*e+y*n+w*v+x*b;return a};k.multiply=q.USE_SIMD?k.SIMD.multiply:k.scalar.multiply;k.mul=k.multiply;k.scalar.translate=function(a,b,c){var d=
c[0],f=c[1];c=c[2];var g,e,m,h,l,n,k,q,t,v,u,r;b===a?(a[12]=b[0]*d+b[4]*f+b[8]*c+b[12],a[13]=b[1]*d+b[5]*f+b[9]*c+b[13],a[14]=b[2]*d+b[6]*f+b[10]*c+b[14],a[15]=b[3]*d+b[7]*f+b[11]*c+b[15]):(g=b[0],e=b[1],m=b[2],h=b[3],l=b[4],n=b[5],k=b[6],q=b[7],t=b[8],v=b[9],u=b[10],r=b[11],a[0]=g,a[1]=e,a[2]=m,a[3]=h,a[4]=l,a[5]=n,a[6]=k,a[7]=q,a[8]=t,a[9]=v,a[10]=u,a[11]=r,a[12]=g*d+l*f+t*c+b[12],a[13]=e*d+n*f+v*c+b[13],a[14]=m*d+k*f+u*c+b[14],a[15]=h*d+q*f+r*c+b[15]);return a};k.SIMD.translate=function(a,b,c){var d=
SIMD.Float32x4.load(b,0),f=SIMD.Float32x4.load(b,4),g=SIMD.Float32x4.load(b,8),e=SIMD.Float32x4.load(b,12);c=SIMD.Float32x4(c[0],c[1],c[2],0);b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11]);d=SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,0,0,0,0));f=SIMD.Float32x4.mul(f,SIMD.Float32x4.swizzle(c,1,1,1,1));g=SIMD.Float32x4.mul(g,SIMD.Float32x4.swizzle(c,2,2,2,2));b=SIMD.Float32x4.add(d,SIMD.Float32x4.add(f,SIMD.Float32x4.add(g,
e)));SIMD.Float32x4.store(a,12,b);return a};k.translate=q.USE_SIMD?k.SIMD.translate:k.scalar.translate;k.scalar.scale=function(a,b,c){var d=c[0],f=c[1];c=c[2];a[0]=b[0]*d;a[1]=b[1]*d;a[2]=b[2]*d;a[3]=b[3]*d;a[4]=b[4]*f;a[5]=b[5]*f;a[6]=b[6]*f;a[7]=b[7]*f;a[8]=b[8]*c;a[9]=b[9]*c;a[10]=b[10]*c;a[11]=b[11]*c;a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a};k.SIMD.scale=function(a,b,c){var d;c=SIMD.Float32x4(c[0],c[1],c[2],0);d=SIMD.Float32x4.load(b,0);SIMD.Float32x4.store(a,0,SIMD.Float32x4.mul(d,
SIMD.Float32x4.swizzle(c,0,0,0,0)));d=SIMD.Float32x4.load(b,4);SIMD.Float32x4.store(a,4,SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,1,1,1,1)));d=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,8,SIMD.Float32x4.mul(d,SIMD.Float32x4.swizzle(c,2,2,2,2)));a[12]=b[12];a[13]=b[13];a[14]=b[14];a[15]=b[15];return a};k.scale=q.USE_SIMD?k.SIMD.scale:k.scalar.scale;k.rotate=function(a,b,c,d){var f=d[0],g=d[1];d=d[2];var e=Math.sqrt(f*f+g*g+d*d),m,h,l,k,p,H,t,v,u,r,B,z,y,w,x,C,D,E,F,G;if(Math.abs(e)<q.EPSILON)return null;
e=1/e;f*=e;g*=e;d*=e;m=Math.sin(c);h=Math.cos(c);l=1-h;c=b[0];e=b[1];k=b[2];p=b[3];H=b[4];t=b[5];v=b[6];u=b[7];r=b[8];B=b[9];z=b[10];y=b[11];w=f*f*l+h;x=g*f*l+d*m;C=d*f*l-g*m;D=f*g*l-d*m;E=g*g*l+h;F=d*g*l+f*m;G=f*d*l+g*m;f=g*d*l-f*m;g=d*d*l+h;a[0]=c*w+H*x+r*C;a[1]=e*w+t*x+B*C;a[2]=k*w+v*x+z*C;a[3]=p*w+u*x+y*C;a[4]=c*D+H*E+r*F;a[5]=e*D+t*E+B*F;a[6]=k*D+v*E+z*F;a[7]=p*D+u*E+y*F;a[8]=c*G+H*f+r*g;a[9]=e*G+t*f+B*g;a[10]=k*G+v*f+z*g;a[11]=p*G+u*f+y*g;b!==a&&(a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);
return a};k.scalar.rotateX=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var f=b[4],g=b[5],e=b[6],m=b[7],h=b[8],l=b[9],k=b[10],p=b[11];b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[4]=f*c+h*d;a[5]=g*c+l*d;a[6]=e*c+k*d;a[7]=m*c+p*d;a[8]=h*c-f*d;a[9]=l*c-g*d;a[10]=k*c-e*d;a[11]=p*c-m*d;return a};k.SIMD.rotateX=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[0]=b[0],a[1]=b[1],a[2]=b[2],a[3]=b[3],
a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var f=SIMD.Float32x4.load(b,4);b=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,4,SIMD.Float32x4.add(SIMD.Float32x4.mul(f,c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,8,SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,c),SIMD.Float32x4.mul(f,d)));return a};k.rotateX=q.USE_SIMD?k.SIMD.rotateX:k.scalar.rotateX;k.scalar.rotateY=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var f=b[0],g=b[1],e=b[2],m=b[3],h=b[8],l=b[9],k=b[10],p=b[11];b!==a&&(a[4]=b[4],
a[5]=b[5],a[6]=b[6],a[7]=b[7],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[0]=f*c-h*d;a[1]=g*c-l*d;a[2]=e*c-k*d;a[3]=m*c-p*d;a[8]=f*d+h*c;a[9]=g*d+l*c;a[10]=e*d+k*c;a[11]=m*d+p*c;return a};k.SIMD.rotateY=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[4]=b[4],a[5]=b[5],a[6]=b[6],a[7]=b[7],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var f=SIMD.Float32x4.load(b,0);b=SIMD.Float32x4.load(b,8);SIMD.Float32x4.store(a,0,SIMD.Float32x4.sub(SIMD.Float32x4.mul(f,
c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,8,SIMD.Float32x4.add(SIMD.Float32x4.mul(f,d),SIMD.Float32x4.mul(b,c)));return a};k.rotateY=q.USE_SIMD?k.SIMD.rotateY:k.scalar.rotateY;k.scalar.rotateZ=function(a,b,c){var d=Math.sin(c);c=Math.cos(c);var f=b[0],g=b[1],e=b[2],m=b[3],h=b[4],l=b[5],k=b[6],p=b[7];b!==a&&(a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);a[0]=f*c+h*d;a[1]=g*c+l*d;a[2]=e*c+k*d;a[3]=m*c+p*d;a[4]=h*c-f*d;a[5]=l*c-g*d;a[6]=k*c-e*
d;a[7]=p*c-m*d;return a};k.SIMD.rotateZ=function(a,b,c){var d=SIMD.Float32x4.splat(Math.sin(c));c=SIMD.Float32x4.splat(Math.cos(c));b!==a&&(a[8]=b[8],a[9]=b[9],a[10]=b[10],a[11]=b[11],a[12]=b[12],a[13]=b[13],a[14]=b[14],a[15]=b[15]);var f=SIMD.Float32x4.load(b,0);b=SIMD.Float32x4.load(b,4);SIMD.Float32x4.store(a,0,SIMD.Float32x4.add(SIMD.Float32x4.mul(f,c),SIMD.Float32x4.mul(b,d)));SIMD.Float32x4.store(a,4,SIMD.Float32x4.sub(SIMD.Float32x4.mul(b,c),SIMD.Float32x4.mul(f,d)));return a};k.rotateZ=q.USE_SIMD?
k.SIMD.rotateZ:k.scalar.rotateZ;k.fromTranslation=function(a,b){a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=b[0];a[13]=b[1];a[14]=b[2];a[15]=1;return a};k.fromScaling=function(a,b){a[0]=b[0];a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=b[1];a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=b[2];a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromRotation=function(a,b,c){var d=c[0],f=c[1];c=c[2];var g=Math.sqrt(d*d+f*f+c*c),e;if(Math.abs(g)<q.EPSILON)return null;g=1/g;d*=g;
f*=g;c*=g;g=Math.sin(b);b=Math.cos(b);e=1-b;a[0]=d*d*e+b;a[1]=f*d*e+c*g;a[2]=c*d*e-f*g;a[3]=0;a[4]=d*f*e-c*g;a[5]=f*f*e+b;a[6]=c*f*e+d*g;a[7]=0;a[8]=d*c*e+f*g;a[9]=f*c*e-d*g;a[10]=c*c*e+b;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromXRotation=function(a,b){var c=Math.sin(b),d=Math.cos(b);a[0]=1;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=d;a[6]=c;a[7]=0;a[8]=0;a[9]=-c;a[10]=d;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromYRotation=function(a,b){var c=Math.sin(b),d=Math.cos(b);a[0]=d;a[1]=
0;a[2]=-c;a[3]=0;a[4]=0;a[5]=1;a[6]=0;a[7]=0;a[8]=c;a[9]=0;a[10]=d;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromZRotation=function(a,b){var c=Math.sin(b),d=Math.cos(b);a[0]=d;a[1]=c;a[2]=0;a[3]=0;a[4]=-c;a[5]=d;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=1;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.fromRotationTranslation=function(a,b,c){var d=b[0],f=b[1],g=b[2],e=b[3],m=d+d,h=f+f,k=g+g;b=d*m;var n=d*h,d=d*k,p=f*h,f=f*k,g=g*k,m=e*m,h=e*h,e=e*k;a[0]=1-(p+g);a[1]=n+e;a[2]=d-h;a[3]=0;a[4]=
n-e;a[5]=1-(b+g);a[6]=f+m;a[7]=0;a[8]=d+h;a[9]=f-m;a[10]=1-(b+p);a[11]=0;a[12]=c[0];a[13]=c[1];a[14]=c[2];a[15]=1;return a};k.getTranslation=function(a,b){a[0]=b[12];a[1]=b[13];a[2]=b[14];return a};k.getRotation=function(a,b){var c=b[0]+b[5]+b[10],d=0;0<c?(d=2*Math.sqrt(c+1),a[3]=.25*d,a[0]=(b[6]-b[9])/d,a[1]=(b[8]-b[2])/d,a[2]=(b[1]-b[4])/d):b[0]>b[5]&b[0]>b[10]?(d=2*Math.sqrt(1+b[0]-b[5]-b[10]),a[3]=(b[6]-b[9])/d,a[0]=.25*d,a[1]=(b[1]+b[4])/d,a[2]=(b[8]+b[2])/d):b[5]>b[10]?(d=2*Math.sqrt(1+b[5]-
b[0]-b[10]),a[3]=(b[8]-b[2])/d,a[0]=(b[1]+b[4])/d,a[1]=.25*d,a[2]=(b[6]+b[9])/d):(d=2*Math.sqrt(1+b[10]-b[0]-b[5]),a[3]=(b[1]-b[4])/d,a[0]=(b[8]+b[2])/d,a[1]=(b[6]+b[9])/d,a[2]=.25*d);return a};k.fromRotationTranslationScale=function(a,b,c,d){var f=b[0],g=b[1],e=b[2],m=b[3],h=f+f,k=g+g,n=e+e;b=f*h;var p=f*k,f=f*n,q=g*k,g=g*n,e=e*n,h=m*h,k=m*k,m=m*n,n=d[0],t=d[1];d=d[2];a[0]=(1-(q+e))*n;a[1]=(p+m)*n;a[2]=(f-k)*n;a[3]=0;a[4]=(p-m)*t;a[5]=(1-(b+e))*t;a[6]=(g+h)*t;a[7]=0;a[8]=(f+k)*d;a[9]=(g-h)*d;a[10]=
(1-(b+q))*d;a[11]=0;a[12]=c[0];a[13]=c[1];a[14]=c[2];a[15]=1;return a};k.fromRotationTranslationScaleOrigin=function(a,b,c,d,f){var g=b[0],e=b[1],k=b[2],h=b[3],l=g+g,n=e+e,p=k+k;b=g*l;var q=g*n,g=g*p,t=e*n,e=e*p,k=k*p,l=h*l,n=h*n,h=h*p,p=d[0],v=d[1];d=d[2];var u=f[0],r=f[1];f=f[2];a[0]=(1-(t+k))*p;a[1]=(q+h)*p;a[2]=(g-n)*p;a[3]=0;a[4]=(q-h)*v;a[5]=(1-(b+k))*v;a[6]=(e+l)*v;a[7]=0;a[8]=(g+n)*d;a[9]=(e-l)*d;a[10]=(1-(b+t))*d;a[11]=0;a[12]=c[0]+u-(a[0]*u+a[4]*r+a[8]*f);a[13]=c[1]+r-(a[1]*u+a[5]*r+a[9]*
f);a[14]=c[2]+f-(a[2]*u+a[6]*r+a[10]*f);a[15]=1;return a};k.fromQuat=function(a,b){var c=b[0],d=b[1],f=b[2],g=b[3],e=c+c,k=d+d,h=f+f,c=c*e,l=d*e,d=d*k,n=f*e,p=f*k,f=f*h,e=g*e,k=g*k,g=g*h;a[0]=1-d-f;a[1]=l+g;a[2]=n-k;a[3]=0;a[4]=l-g;a[5]=1-c-f;a[6]=p+e;a[7]=0;a[8]=n+k;a[9]=p-e;a[10]=1-c-d;a[11]=0;a[12]=0;a[13]=0;a[14]=0;a[15]=1;return a};k.frustum=function(a,b,c,d,f,g,e){var k=1/(c-b),h=1/(f-d),l=1/(g-e);a[0]=2*g*k;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=2*g*h;a[6]=0;a[7]=0;a[8]=(c+b)*k;a[9]=(f+d)*h;a[10]=
(e+g)*l;a[11]=-1;a[12]=0;a[13]=0;a[14]=e*g*2*l;a[15]=0;return a};k.perspective=function(a,b,c,d,f){b=1/Math.tan(b/2);var g=1/(d-f);a[0]=b/c;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=b;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=(f+d)*g;a[11]=-1;a[12]=0;a[13]=0;a[14]=2*f*d*g;a[15]=0;return a};k.perspectiveFromFieldOfView=function(a,b,c,d){var f=Math.tan(b.upDegrees*Math.PI/180),g=Math.tan(b.downDegrees*Math.PI/180),e=Math.tan(b.leftDegrees*Math.PI/180);b=Math.tan(b.rightDegrees*Math.PI/180);var k=2/(e+b),h=2/(f+g);a[0]=
k;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=h;a[6]=0;a[7]=0;a[8]=-((e-b)*k*.5);a[9]=(f-g)*h*.5;a[10]=d/(c-d);a[11]=-1;a[12]=0;a[13]=0;a[14]=d*c/(c-d);a[15]=0;return a};k.ortho=function(a,b,c,d,f,g,e){var k=1/(b-c),h=1/(d-f),l=1/(g-e);a[0]=-2*k;a[1]=0;a[2]=0;a[3]=0;a[4]=0;a[5]=-2*h;a[6]=0;a[7]=0;a[8]=0;a[9]=0;a[10]=2*l;a[11]=0;a[12]=(b+c)*k;a[13]=(f+d)*h;a[14]=(e+g)*l;a[15]=1;return a};k.lookAt=function(a,b,c,d){var f,g,e,m,h,l,n,p,H=b[0],t=b[1];b=b[2];e=d[0];m=d[1];g=d[2];n=c[0];d=c[1];f=c[2];if(Math.abs(H-
n)<q.EPSILON&&Math.abs(t-d)<q.EPSILON&&Math.abs(b-f)<q.EPSILON)return k.identity(a);c=H-n;d=t-d;n=b-f;p=1/Math.sqrt(c*c+d*d+n*n);c*=p;d*=p;n*=p;f=m*n-g*d;g=g*c-e*n;e=e*d-m*c;(p=Math.sqrt(f*f+g*g+e*e))?(p=1/p,f*=p,g*=p,e*=p):e=g=f=0;m=d*e-n*g;h=n*f-c*e;l=c*g-d*f;(p=Math.sqrt(m*m+h*h+l*l))?(p=1/p,m*=p,h*=p,l*=p):l=h=m=0;a[0]=f;a[1]=m;a[2]=c;a[3]=0;a[4]=g;a[5]=h;a[6]=d;a[7]=0;a[8]=e;a[9]=l;a[10]=n;a[11]=0;a[12]=-(f*H+g*t+e*b);a[13]=-(m*H+h*t+l*b);a[14]=-(c*H+d*t+n*b);a[15]=1;return a};k.str=function(a){return"mat4("+
a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+", "+a[8]+", "+a[9]+", "+a[10]+", "+a[11]+", "+a[12]+", "+a[13]+", "+a[14]+", "+a[15]+")"};k.frob=function(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2)+Math.pow(a[3],2)+Math.pow(a[4],2)+Math.pow(a[5],2)+Math.pow(a[6],2)+Math.pow(a[7],2)+Math.pow(a[8],2)+Math.pow(a[9],2)+Math.pow(a[10],2)+Math.pow(a[11],2)+Math.pow(a[12],2)+Math.pow(a[13],2)+Math.pow(a[14],2)+Math.pow(a[15],2))};k.add=function(a,b,
c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3];a[4]=b[4]+c[4];a[5]=b[5]+c[5];a[6]=b[6]+c[6];a[7]=b[7]+c[7];a[8]=b[8]+c[8];a[9]=b[9]+c[9];a[10]=b[10]+c[10];a[11]=b[11]+c[11];a[12]=b[12]+c[12];a[13]=b[13]+c[13];a[14]=b[14]+c[14];a[15]=b[15]+c[15];return a};k.subtract=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2];a[3]=b[3]-c[3];a[4]=b[4]-c[4];a[5]=b[5]-c[5];a[6]=b[6]-c[6];a[7]=b[7]-c[7];a[8]=b[8]-c[8];a[9]=b[9]-c[9];a[10]=b[10]-c[10];a[11]=b[11]-c[11];a[12]=b[12]-c[12];
a[13]=b[13]-c[13];a[14]=b[14]-c[14];a[15]=b[15]-c[15];return a};k.sub=k.subtract;k.multiplyScalar=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c;a[4]=b[4]*c;a[5]=b[5]*c;a[6]=b[6]*c;a[7]=b[7]*c;a[8]=b[8]*c;a[9]=b[9]*c;a[10]=b[10]*c;a[11]=b[11]*c;a[12]=b[12]*c;a[13]=b[13]*c;a[14]=b[14]*c;a[15]=b[15]*c;return a};k.multiplyScalarAndAdd=function(a,b,c,d){a[0]=b[0]+c[0]*d;a[1]=b[1]+c[1]*d;a[2]=b[2]+c[2]*d;a[3]=b[3]+c[3]*d;a[4]=b[4]+c[4]*d;a[5]=b[5]+c[5]*d;a[6]=b[6]+c[6]*d;a[7]=b[7]+c[7]*
d;a[8]=b[8]+c[8]*d;a[9]=b[9]+c[9]*d;a[10]=b[10]+c[10]*d;a[11]=b[11]+c[11]*d;a[12]=b[12]+c[12]*d;a[13]=b[13]+c[13]*d;a[14]=b[14]+c[14]*d;a[15]=b[15]+c[15]*d;return a};k.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]&&a[6]===b[6]&&a[7]===b[7]&&a[8]===b[8]&&a[9]===b[9]&&a[10]===b[10]&&a[11]===b[11]&&a[12]===b[12]&&a[13]===b[13]&&a[14]===b[14]&&a[15]===b[15]};k.equals=function(a,b){var c=a[0],d=a[1],f=a[2],g=a[3],e=a[4],k=a[5],h=a[6],l=a[7],
n=a[8],p=a[9],H=a[10],t=a[11],v=a[12],u=a[13],r=a[14],B=a[15],z=b[0],y=b[1],w=b[2],x=b[3],C=b[4],D=b[5],E=b[6],F=b[7],G=b[8],I=b[9],J=b[10],K=b[11],A=b[12],L=b[13],M=b[14],N=b[15];return Math.abs(c-z)<=q.EPSILON*Math.max(1,Math.abs(c),Math.abs(z))&&Math.abs(d-y)<=q.EPSILON*Math.max(1,Math.abs(d),Math.abs(y))&&Math.abs(f-w)<=q.EPSILON*Math.max(1,Math.abs(f),Math.abs(w))&&Math.abs(g-x)<=q.EPSILON*Math.max(1,Math.abs(g),Math.abs(x))&&Math.abs(e-C)<=q.EPSILON*Math.max(1,Math.abs(e),Math.abs(C))&&Math.abs(k-
D)<=q.EPSILON*Math.max(1,Math.abs(k),Math.abs(D))&&Math.abs(h-E)<=q.EPSILON*Math.max(1,Math.abs(h),Math.abs(E))&&Math.abs(l-F)<=q.EPSILON*Math.max(1,Math.abs(l),Math.abs(F))&&Math.abs(n-G)<=q.EPSILON*Math.max(1,Math.abs(n),Math.abs(G))&&Math.abs(p-I)<=q.EPSILON*Math.max(1,Math.abs(p),Math.abs(I))&&Math.abs(H-J)<=q.EPSILON*Math.max(1,Math.abs(H),Math.abs(J))&&Math.abs(t-K)<=q.EPSILON*Math.max(1,Math.abs(t),Math.abs(K))&&Math.abs(v-A)<=q.EPSILON*Math.max(1,Math.abs(v),Math.abs(A))&&Math.abs(u-L)<=q.EPSILON*
Math.max(1,Math.abs(u),Math.abs(L))&&Math.abs(r-M)<=q.EPSILON*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(B-N)<=q.EPSILON*Math.max(1,Math.abs(B),Math.abs(N))};return k});