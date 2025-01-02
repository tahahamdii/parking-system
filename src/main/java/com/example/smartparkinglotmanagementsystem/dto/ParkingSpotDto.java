package com.example.smartparkinglotmanagementsystem.dto;

import com.example.smartparkinglotmanagementsystem.enums.SpotSize;
import com.example.smartparkinglotmanagementsystem.enums.SpotStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ParkingSpotDto implements Serializable {
    private Long id;

    private String spotId;

    private SpotSize spotSize;

    private Boolean isOccupied;

    private VehicleDto currentVehicle;

    private SpotStatus spotStatus;
}
