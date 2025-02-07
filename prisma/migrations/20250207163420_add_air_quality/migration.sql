-- CreateTable
CREATE TABLE `AirQuality` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `aqi` INTEGER NULL,
    `pm25` DOUBLE NULL,
    `pm10` DOUBLE NULL,
    `co` DOUBLE NULL,
    `so2` DOUBLE NULL,
    `no2` DOUBLE NULL,
    `o3` DOUBLE NULL,
    `temperature` DOUBLE NULL,
    `humidity` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
