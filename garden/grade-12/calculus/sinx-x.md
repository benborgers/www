---
title: Proof that limit as x → 0 of sin(x)/x = 1
date: 2020-11-07
---

![](/assets/sinx-x-diagram.jpg)

This is a unit circle, so there two radii are labeled with length $$1$$. The vertical line labeled $$\sin{x}$$ because sine of the angle $$x$$ is that line over the hypotenuse ($$1$$). The second vertical line is labeled $$\tan{x}$$ because tangent of the angle $$x$$ is that line over the base of the triangle ($$1$$).

Compare the areas of three regions on the diagram above:

- Blue: $$\frac{1}{2}(\text{base})(\text{height}) = \frac{1}{2}(1)(\sin{x}) = \frac{1}{2}\sin{x}$$
- Blue + yellow: $$\frac{x}{2\pi}(\pi) = \frac{x\pi}{2\pi} = \frac{x}{2}$$
	- The area of that sector of the circle is that part of the circle ($$x$$ radians out of $$2\pi$$ total radians around the circle) times the area of the circle ($$\pi r^2$$, or $$\pi 1^2$$, so $$\pi$$).
- Blue + yellow + red: $$\frac{1}{2}(\text{base})(\text{height}) = \frac{1}{2}(1)(\tan{x}) = \frac{1}{2}\tan{x}$$

We can see visually that these areas can be arranged in order of size like this:

- $$\frac{1}{2} \sin{x} < \frac{x}{2} < \frac{1}{2} \tan{x}$$
- $$\sin{x} < x < \tan{x}$$
- $$\frac{\sin{x}}{\sin{x}} < \frac{x}{\sin{x}} < \frac{\tan{x}}{\sin{x}}$$
	- Divide each term by $$\sin{x}$$
- $$1 < \frac{x}{\sin{x}} < \frac{1}{\cos{x}}$$
	- Simplify the last step
- $$1 > \frac{\sin{x}}{x} > \cos{x}$$
	- Take the reciprocal of each term, and therefore flip inequality signs

By the **Squeeze Theorem**, we can see that $$\frac{\sin{x}}{x}$$ is "squeezed" between 1 and $$\cos{x}$$. As $$x$$ tends to 0, $$\cos{x}$$ tends to 1 as well.

Therefore, $$\frac{\sin{x}}{x}$$ is squeezed between 1 and 1 as x → 0, so the limit of $$\frac{\sin{x}}{x}$$ is 1.
