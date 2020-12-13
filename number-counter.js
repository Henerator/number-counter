class NumberCounter {
    constructor(start, end, controlA, controlB, duration, FPS = 60) {
        this.start = start;
        this.end = end;
        this.controlA = controlA;
        this.controlB = controlB;
        this.duration = duration;
        this.FPS = FPS;
    }

    onChange() { }
    onTransitionEnd() { }

    startTransition() {
        const values = this.getBezierPoints();
        const onChange = this.onChange;
        const onTransitionEnd = this.onTransitionEnd;

        function nextStep() {
            const currentValue = values.shift();
            onChange(currentValue);

            if (values.length === 0) {
                onTransitionEnd();
                return;
            }

            window.requestAnimationFrame(nextStep);
        }

        nextStep();
    }

    getBezierPoints() {
        const { start, end, controlA, controlB, duration, FPS } = this;
        const points = [];
        const length = Math.abs(end - start);
        const absStart = Math.min(start, end);
        const scaledControlA = absStart + controlA * length;
        const scaledControlB = absStart + controlB * length;
        const dt = 1 / (duration * FPS);
        let t = 0;
        while (t < 1) {
            const inverseT = 1 - t;
            const point = Math.pow(inverseT, 3) * start
                + 3 * Math.pow(inverseT, 2) * t * scaledControlA
                + 3 * Math.pow(t, 2) * inverseT * scaledControlB
                + Math.pow(t, 3) * end;

            points.push(point);
            t += dt;
        }
        points.push(end);
        return points;
    }
}