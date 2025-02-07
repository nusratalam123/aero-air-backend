/*
  Warnings:

  - The primary key for the `AirQuality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `o3` on the `AirQuality` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `AirQuality` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `windSpeed` to the `AirQuality` table without a default value. This is not possible if the table is not empty.
  - Made the column `location` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aqi` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pm25` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pm10` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `co` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `so2` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `no2` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `temperature` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.
  - Made the column `humidity` on table `AirQuality` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `AirQuality` DROP PRIMARY KEY,
    DROP COLUMN `o3`,
    ADD COLUMN `windSpeed` DOUBLE NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `location` VARCHAR(191) NOT NULL,
    MODIFY `latitude` DOUBLE NOT NULL,
    MODIFY `longitude` DOUBLE NOT NULL,
    MODIFY `aqi` INTEGER NOT NULL,
    MODIFY `pm25` DOUBLE NOT NULL,
    MODIFY `pm10` DOUBLE NOT NULL,
    MODIFY `co` DOUBLE NOT NULL,
    MODIFY `so2` DOUBLE NOT NULL,
    MODIFY `no2` DOUBLE NOT NULL,
    MODIFY `temperature` DOUBLE NOT NULL,
    MODIFY `humidity` DOUBLE NOT NULL,
    ADD PRIMARY KEY (`id`);
