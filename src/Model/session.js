const meditate = ({minutes, phases}) => {
    const timeInPhases = phases.map(percentage => (minutes * 1000 * 60) * (percentage / 100));

    let meditationStartCb = () => {};
    let phaseFinishedCb = () => {};
    let meditationFinishedCb = () => {};
    let currentPhaseTimer = null;
    let completedPhases = 0;
    let isMeditating = false;

    const runPhase = async (currentPhase) => {
        console.log('time', timeInPhases)
        isMeditating = true;
        currentPhaseTimer = setTimeout(() => {
            completedPhases = completedPhases + 1;
            setImmediate(() => phaseFinishedCb({ phase: currentPhase, duration: timeInPhases[currentPhase] }));

            if (currentPhase < phases.length) {
                return runPhase(currentPhase + 1);
            } 
            
            isMeditating = false;
            stopMeditation();
        }, timeInPhases[currentPhase]);
    }

    const stopMeditation = () => {
        clearTimeout(currentPhaseTimer);
        isMeditating = false;
        return setImmediate(meditationFinishedCb);
    }

    const response = {
        minutes,
        phases: timeInPhases,
        completedPhases,
        isMeditating,

        onPhaseFinished: (cb) => {
            phaseFinishedCb = cb;
        },

        onMeditationFinished: (cb) => {
            meditationFinishedCb = cb;
        },

        onMeditationStarted: (cb) => {
            meditationStartCb = cb;
            return response;
        },

        start: () => {
            setImmediate(() => meditationStartCb());
            runPhase(0);
        },

        stop: () => stopMeditation()
    };

    return response;
}

export { meditate };