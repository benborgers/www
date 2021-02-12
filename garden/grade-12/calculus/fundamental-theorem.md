---
title: Fundamental Theorem of Calculus
---

The Fundamental Theorem of Calculus lets you calculate an integral. It says that $$\int_a^b f(x)dx = F(b) - F(a)$$ where $$F$$ is the antiderivative of $$f$$.

Looking at the area under a curve, increasing the domain horizontally by a small sliver increases (the entire area by the value of the function at that point; the height) * (the width of that sliver).

_This also makes sense, because once the size of the sliver is small enough, you're essentially just adding a tiny slice of height $$v(T)$$._

Since the rate of change of the area under the graph is equal to the value of the function, we can find the function for the area under the curve by finding the antiderivative of the function itself — the antiderivative of $$v(T)$$.

**The function for the area under a function is the antiderivative of the function.**

To "calibrate" the antiderivative, we know that the value of the integral should be $$0$$ when $$T = 0$$ (since $$\int_0^0 = 0$$). Therefore, we take the antiderivative at $$b$$ and subtract the value of the antiderivative at $$a$$. When $$a = b$$, these will cancel out correctly. This gives us $$F(b) - F(a)$$.
