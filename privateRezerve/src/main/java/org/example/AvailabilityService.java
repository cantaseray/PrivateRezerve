package org.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AvailabilityService {

    @Autowired
    private AvailabilityRepository availabilityRepository;

    // Yeni müsait saat aralığı ekleme
    public Availability addAvailability(Availability availability) {
        return availabilityRepository.save(availability);
    }

    // Belirli bir günün tüm müsait saatlerini listeleme
    public List<Availability> getAvailabilityByDay(String dayOfWeek) {
        return availabilityRepository.findByDayOfWeek(dayOfWeek);
    }

    // Tüm müsait saatleri listeleme
    public List<Availability> getAllAvailability() {
        return availabilityRepository.findAll();
    }

    // Müsaitlik güncelle
    public Availability updateAvailability(Long id, Availability updatedAvailability) {
        return availabilityRepository.findById(id).map(availability -> {
            availability.setDayOfWeek(updatedAvailability.getDayOfWeek());
            availability.setStartTime(updatedAvailability.getStartTime());
            availability.setEndTime(updatedAvailability.getEndTime());
            return availabilityRepository.save(availability);
        }).orElse(null);
    }

    // Müsaitlik sil
    public void deleteAvailability(Long id) {
        availabilityRepository.deleteById(id);
    }
}