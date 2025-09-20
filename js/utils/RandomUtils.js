export default class RandomUtils {

    static int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static float(min, max) {
        return Math.random() * (max - min) + min;
    }

    static bool() {
        return Math.random() < 0.5;
    }

    static el(array) {
        return array[RandomUtils.int(0, array.length - 1)];
    }
}
