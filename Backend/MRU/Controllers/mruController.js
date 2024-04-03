function handlePageRequests(req, res) {
    try {
        const { referenceString, numberOfFrames } = req.body;

        console.log(`Received request with reference string: ${referenceString} and ${numberOfFrames} frames`);

        if (!referenceString || !numberOfFrames) {
            throw new Error('Reference string and number of frames are required.');
        }

        let frames = Array(Number(numberOfFrames)).fill(-1);
        let pageFaults = 0;
        let hits = 0;

        for (let pageIndex = 0; pageIndex < referenceString.length; pageIndex++) {
            let isFound = false;

            for (let i = 0; i < numberOfFrames; i++) {
                if (frames[i] === referenceString[pageIndex]) {
                    isFound = true;
                    hits++;
                    break;
                }
            }

            if (!isFound) {
                let hasFreeFrame = false;

                for (let i = 0; i < numberOfFrames; i++) {
                    if (frames[i] === -1) {
                        hasFreeFrame = true;
                        frames[i] = referenceString[pageIndex];
                        pageFaults++;
                        break;
                    }
                }

                if (!hasFreeFrame) {
                    let lastUse = Array(numberOfFrames).fill(0);

                    for (let i = 0; i < numberOfFrames; i++) {
                        for (let p = pageIndex; p >= 0; p--) {
                            if (referenceString[p] === frames[i]) {
                                lastUse[i] = p;
                                break;
                            }
                        }
                    }

                    let victim = 0;
                    for (let i = 0; i < numberOfFrames; i++) {
                        if (lastUse[i] > lastUse[victim]) {
                            victim = i;
                        }
                    }

                    frames[victim] = referenceString[pageIndex];
                    pageFaults++;
                }
            }
        }

        let hitPercent = (hits / referenceString.length) * 100;
        let faultPercent = (pageFaults / referenceString.length) * 100;
        console.log('Number Of Page Faults:', pageFaults);
        console.log('Number Of Hits:', hits);
        console.log('Hit Percentage:', hitPercent.toFixed(2) + '%');
        console.log('Fault Percentage:', faultPercent.toFixed(2) + '%')
        res.json({ pageFaults, hits, hitPercent, faultPercent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handlePageRequests
};
